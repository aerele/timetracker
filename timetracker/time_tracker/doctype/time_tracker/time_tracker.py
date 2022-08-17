# Copyright (c) 2022, Aerele Technologies and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import json

class TimeTracker(Document):
	pass


@frappe.whitelist()
def get_tasks(projects, favourite, user):

	projects = json.loads(projects)
	user = json.loads(user)
	
	task_list = []
	if favourite == "1":
		user = "%"+user[0]+"%"
		for i in projects:
			tasks = frappe.db.sql("""select 
										name, subject, project 
									from 
										`tabTask` 
									where 
										project = %s and 
										status!= 'Cancelled' and
										status != 'Completed' and
										_liked_by like %s
									"""
									, (i, user), as_dict=1)
			task_list += tasks
	else:
		for i in projects:
			ls = frappe.db.sql("""select 
									name, subject, project 
								from 
									`tabTask` 
								where 
									project = %s and 
									status != 'Completed' and
									status!= 'Cancelled'
								""", i, as_dict=True)
			task_list += ls
	frappe.errprint(task_list)
	return task_list


@frappe.whitelist()
def run_sql():
	return frappe.db.sql("""select name, subject, project from `tabTask`""", as_dict=True)