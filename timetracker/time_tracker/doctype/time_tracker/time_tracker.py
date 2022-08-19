# Copyright (c) 2022, Aerele Technologies and contributors
# For license information, please see license.txt

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

	task_list = frappe.db.sql("""
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
								""",(user[0], from_date, to_date, projects), as_dict=1)
	for i in task_list:
		task_name_list.append(i.name)


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
								""", (projects, usr,task_name_list), as_dict=1)
	else:
		task_list += frappe.db.sql("""select 
								name, subject, project 
							from 
								`tabTask` 
							where 
								project in %s and 
								status != 'Completed' and
								status!= 'Cancelled' and
								name not in %s
							""", (projects,task_name_list), as_dict=True)

	frappe.errprint("******************************")
	for i in task_list:
		frappe.errprint(i)
	frappe.errprint("******************************")
	return task_list


@frappe.whitelist()
def run_sql():
	return frappe.db.sql("""select name, subject, project from `tabTask`""", as_dict=True)

@frappe.whitelist()
# create a function to generate timesheet for a particular date
def generate_timesheet(date, user):
	return 0
