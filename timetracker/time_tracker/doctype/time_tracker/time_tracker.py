# Copyright (c) 2022, Aerele Technologies and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import json

class TimeTracker(Document):
	pass


@frappe.whitelist()
#  get tasks with status not cancelled and completed based on project and fill it in eachbrow of table
def get_tasks(projects):
	# log the value in server console
	projects = json.loads(projects)
	task_list = []
	for i in projects:
		project = i["project"]
		ls = frappe.db.sql("""select name, subject, project from `tabTask` where project = %s""", i["project"], as_dict=True)
		task_list += ls
	frappe.errprint(task_list)
	return task_list