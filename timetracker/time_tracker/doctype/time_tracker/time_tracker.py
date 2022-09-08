# Copyright (c) 2022, Aerele Technologies and contributors
# For license information, please see license.txt

import datetime
import frappe
from frappe.model.document import Document
import json


class TimeTracker(Document):
	pass


@frappe.whitelist()
def get_tasks(projects, favourite, user, from_date, to_date):
	projects = json.loads(projects)
	user = json.loads(user)
	task_list = []
	task_name_list = ["zzz"]
	#submitted tasks in timesheet
	task_list = frappe.db.sql("""
									select
										tsd.task as name,
										tsd.from_time as date,
										ts.parent_project as project,
										tsd.hours as duration,
										tsd.name as tsd_name,
										ts.name as ts_name,
										ts.docstatus as submitted
									from
										`tabTimesheet` as ts 
									
									inner join `tabTimesheet Detail` as tsd on ts.name = tsd.parent
									inner join `tabTask` as t on tsd.task = t.name
									inner join `tabEmployee` as e on ts.employee = e.name

									where
										ts.docstatus = 1 and
										e.user_id = %s and
										tsd.from_time between %s and %s and
										ts.parent_project in %s
								""", (user[0], from_date, to_date, projects), as_dict=1)
	frappe.errprint(task_list)
	#saved tasks in timesheet
	task_list += frappe.db.sql("""
									select
										tsd.task as name,
										tsd.from_time as date,
										ts.parent_project as project,
										tsd.hours as duration,
										tsd.name as tsd_name,
										ts.name as ts_name
									from
										`tabTimesheet` as ts 
									
									inner join `tabTimesheet Detail` as tsd on ts.name = tsd.parent
									inner join `tabTask` as t on tsd.task = t.name
									inner join `tabEmployee` as e on ts.employee = e.name

									where
										ts.docstatus = 0 and
										e.user_id = %s and
										tsd.from_time between %s and %s and
										ts.parent_project in %s
								""", (user[0], from_date, to_date, projects), as_dict=1)
	for i in task_list:
		task_name_list.append(i.name)

	#remaining tasks with respect to the selected options
	if favourite == "1":
		usr = "%"+user[0]+"%"
		task_list += frappe.db.sql("""select 
									name, subject, project 
								from 
									`tabTask` 
								where 
									project in %s and 
									status!= 'Cancelled' and
									status != 'Completed' and
									_liked_by like %s and
									name not in %s
								""", (projects, usr, task_name_list), as_dict=1)
	else:
		usr = "%"+user[0]+"%"
		task_list += frappe.db.sql("""select 
								name, subject, project 
							from 
								`tabTask` 
							where 
								project in %s and 
								status != 'Completed' and
								status!= 'Cancelled' and
								name not in %s and
								_assign like %s
							""", (projects, task_name_list, usr), as_dict=True)
	return task_list


@frappe.whitelist()
def generate_timesheet(new_timesheet, amend_timesheet, user):
	settings = frappe.get_single("Projects Settings")
	initial_setting = settings.ignore_employee_time_overlap
	settings.ignore_employee_time_overlap = 1
	settings.save()
	new_timesheet = json.loads(new_timesheet)
	amend_timesheet = json.loads(amend_timesheet)
	for i in new_timesheet:
		generate_new_timesheet(i, user)
	for i in amend_timesheet:
		edit_timesheet(i)
	settings.ignore_employee_time_overlap = initial_setting
	settings.save()
	return 1

# whitelist function to submit the list of timesheet


@frappe.whitelist()
def submit_timesheet(timesheet_list):
	settings = frappe.get_single("Projects Settings")
	initial_setting = settings.ignore_employee_time_overlap
	settings.ignore_employee_time_overlap = 1
	settings.save()
	timesheet_list = json.loads(timesheet_list)
	for i in timesheet_list:
		timesheet = frappe.get_doc("Timesheet", i)
		timesheet.submit()
	settings.ignore_employee_time_overlap = initial_setting
	settings.save()
	return 1


def generate_new_timesheet(new_timesheet, user):
	# get name from employee doctype where user_id = user
	employee = frappe.db.get_value("Employee", {"user_id": user}, "name")
	company = frappe.db.get_value("Employee", {"user_id": user}, "company")
	timesheet = frappe.new_doc("Timesheet")
	timesheet.employee = employee
	timesheet.company = company
	timesheet.parent_project = new_timesheet["project"]
	for i in new_timesheet["data"]:
		row = timesheet.append("time_logs", {})
		row.activity_type = "Execution"
		row.from_time = datetime.datetime.strptime(i["date"], '%Y-%m-%d')
		row.hours = i["duration"]/3600
		row.project = new_timesheet["project"]
		row.task = i["task"]
	timesheet.save(ignore_permissions=True)


def edit_timesheet(amend_timesheet):
	timesheet = frappe.get_doc("Timesheet", amend_timesheet["timesheet"])
	old_time_logs = timesheet.time_logs
	edited_time_logs = []
	for new in amend_timesheet["data"]:
		flag = True
		for old in timesheet.time_logs:
			from_time = datetime.datetime.strftime(old.from_time, '%Y-%m-%d')
			if new["task"] == old.task and from_time == new["date"]:
				flag = False
				old.hours = new["duration"]/3600
				edited_time_logs.append(old.name)
		if flag:
			timesheet.append("time_logs",
								{
									"activity_type": "Execution",
									"from_time": datetime.datetime.strptime(new["date"], '%Y-%m-%d'),
									"hours": new["duration"]/3600,
									"project": amend_timesheet["project"],
									"task": new["task"]
								},
							)
	# for i in old_time_logs:
	# 	if (i.name not in edited_time_logs):
	# 		timesheet.remove(i)
	# counter = 1
	# for i in timesheet.time_logs:
	# 	i.idx = counter
	# 	counter += 1
	timesheet.save(ignore_permissions=True)
