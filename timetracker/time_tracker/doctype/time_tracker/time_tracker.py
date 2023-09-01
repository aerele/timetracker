# Copyright (c) 2022, Aerele Technologies and contributors
# For license information, please see license.txt

import datetime
import frappe
from frappe.model.document import Document
import json


class TimeTracker(Document):
	pass


@frappe.whitelist()
def get_tasks(projects,favourite, user, from_date, to_date):
	projects = json.loads(projects)
	user = json.loads(user)
	task_list = []
	task_name_list = ["zzz"]
	filters = ""
	if len(projects)>0:
		projects = tuple(projects)
		filters += "and ts.parent_project in ('{0}') ".format("', '".join(projects))
	if len(user)==1 and user[0]=='' or user[0] == None:
		user = [id[0] for id in frappe.db.get_list("Employee",{"status":"Active"},"user_id",as_list = 1)]
	#submitted tasks in timesheet
	user_filter = "and e.user_id in ('{0}') ".format("', '".join(user))
	
	task_list = frappe.db.sql("""
									select
										tsd.task as name,
										t.subject as subject,
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
										tsd.from_time between %s and %s {0} {1}
								""".format(filters,user_filter),(from_date,to_date), as_dict=1)
	for data in task_list:
		if "project" in data and data["project"]:
			data["project_name"] = frappe.db.get_value("Project",data["project"],"project_name")
		if "name" in data and data["name"]:
			data["set_as_fav"]=0 if not frappe.db.get_value("Task",data["name"],"_liked_by") or "[]" in frappe.db.get_value("Task",data["name"],"_liked_by") else 1
	#saved tasks in timesheet
	task_list += frappe.db.sql("""
									select
										tsd.task as name,
										t.subject as subject,
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
										tsd.from_time between %s and %s {0}
								""".format(filters),(user[0], from_date, to_date), as_dict=1)
	for i in task_list:
		if "project" in i and i["project"]:
			i["project_name"] = frappe.db.get_value("Project",i["project"],"project_name")
		if "name" in i and i["name"]:
			i["set_as_fav"]=0 if not frappe.db.get_value("Task",i["name"],"_liked_by") or "[]" in frappe.db.get_value("Task",i["name"],"_liked_by") else 1
		task_name_list.append(i.name)

	#remaining tasks with respect to the selected options
	project_filter = ""
	if len(projects) > 0:
		project_filter += "and project in  ('{0}') ".format("', '".join(projects))
	if favourite == "1":
		usr = "%"+user[0]+"%"
		d = frappe.db.sql("""select 
									name, subject, project 
								from 
									`tabTask` 
								where 
									status!= 'Cancelled' and
									status != 'Completed' and
									_liked_by like %s and
									name not in %s {0}
								""".format(project_filter), (usr, task_name_list), as_dict=1)
		for val in d:
			val["project_name"] = frappe.db.get_value("Project",val["project"],"project_name")
			if "name" in val and val["name"]:
				val["set_as_fav"]=0 if not frappe.db.get_value("Task",val["name"],"_liked_by") or "[]" in frappe.db.get_value("Task",val["name"],"_liked_by") else 1
		task_list += d

	else:
		usr = "%"+user[0]+"%"
		d = frappe.db.sql("""select 
								name, subject, project 
							from 
								`tabTask` 
							where 
								status != 'Completed' and
								status!= 'Cancelled' and
								name not in %s and
								_assign like %s {0}
							""".format(project_filter), (task_name_list, usr), as_dict=1)
		for val in d:
			val["project_name"] = frappe.db.get_value("Project",val["project"],"project_name")
			if "name" in val and val["name"]:
				val["set_as_fav"]=0 if not frappe.db.get_value("Task",val["name"],"_liked_by") or "[]" in frappe.db.get_value("Task",val["name"],"_liked_by") else 1

		task_list += d
	
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
	if not "project" in new_timesheet:
		frappe.throw("No project found")
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
		row.hours = float(i["duration"])/3600
		row.project = new_timesheet["project"]
		row.task = i["task"]
		if i["task"] and "set_as_favorite" in i:
			if i["set_as_favorite"]:
				frappe.db.set_value("Task",i["task"],"_liked_by","[\"{0}\"]".format(frappe.session.user))
			else:
				frappe.db.set_value("Task",i["task"],"_liked_by",None)
			# print('''update `tabTask` set _liked_by='{0}' where name = "{1}" '''.format("['Administrator']",i["task"]))
			# frappe.db.sql('''update `tabTask` set _liked_by = '{0}' where name = {1} '''.format("['Administrator']",i["task"]))
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
				if new["task"]:
					if "set_as_favorite" in new:
						if new["set_as_favorite"]:
							frappe.db.set_value("Task",new["task"],"_liked_by","[\"{0}\"]".format(frappe.session.user))
						else:
							frappe.db.set_value("Task",new["task"],"_liked_by",None)
				flag = False
				old.hours = float(new["duration"])/3600
				edited_time_logs.append(old.name)
		if flag:
			timesheet.append("time_logs",
								{
									"activity_type": "Execution",
									"from_time": datetime.datetime.strptime(new["date"], '%Y-%m-%d'),
									"hours": float(new["duration"])/3600,
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
