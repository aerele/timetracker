// Copyright (c) 2022, Aerele Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on('Time Tracker', {
	onload: function(frm) {
		frm.clear_table("totals");
		frm.add_child("totals");
	},
	project: function(frm) {
		frm.set_query("task", "details", function(doc, cdt, cdn) {
			let projects = []
			let mates = []
			for (let i = 0; i < frm.doc.project.length; i++) {
				projects.push(frm.doc.project[i].project)
			}
			for (let j = 0; j < frm.doc.teammates.length; j++) {
				mates.push(frm.doc.teammates[j].user)
			}
			console.log(projects)
			console.log(mates)

			return {
				filters: {
					project: ["in", projects],
					assignee: ["in", mates]
				}
			};
		});
	},
	teammates: function(frm) {
		frm.set_query("task", "details", function(doc, cdt, cdn) {
			let projects = []
			let mates = []
			for (let i = 0; i < frm.doc.project.length; i++) {
				projects.push(frm.doc.project[i].project)
			}
			for (let j = 0; j < frm.doc.teammates.length; j++) {
				mates.push(frm.doc.teammates[j].user)
			}
			console.log(projects)
			console.log(mates)

			return {
				filters: {
					project: ["in", projects],
					assignee: ["in", mates]
				}
			};
		});
	},
	from: function(frm) {
		frm.set_value("to", frappe.datetime.add_days(frm.doc.from, 6));
		frm.refresh_fields();

		var day_1 = frappe.meta.get_docfield("Time Tracker Detail","day_1", frm.doc.name);
		day_1.label = "Mon (" + frappe.datetime.get_datetime_as_string(frappe.datetime.add_days(frm.doc.from, 0)).split("-")[2].split(" ")[0] + ")";
		var day_2 = frappe.meta.get_docfield("Time Tracker Detail","day_2", frm.doc.name);
		day_2.label = "Tue (" + frappe.datetime.get_datetime_as_string(frappe.datetime.add_days(frm.doc.from, 1)).split("-")[2].split(" ")[0] + ")";
		var day_3 = frappe.meta.get_docfield("Time Tracker Detail","day_3", frm.doc.name);
		day_3.label = "Wed (" + frappe.datetime.get_datetime_as_string(frappe.datetime.add_days(frm.doc.from, 2)).split("-")[2].split(" ")[0] + ")";
		var day_4 = frappe.meta.get_docfield("Time Tracker Detail","day_4", frm.doc.name);
		day_4.label = "Thu (" + frappe.datetime.get_datetime_as_string(frappe.datetime.add_days(frm.doc.from, 3)).split("-")[2].split(" ")[0] + ")";
		var day_5 = frappe.meta.get_docfield("Time Tracker Detail","day_5", frm.doc.name);
		day_5.label = "Fri (" + frappe.datetime.get_datetime_as_string(frappe.datetime.add_days(frm.doc.from, 4)).split("-")[2].split(" ")[0] + ")";
		var day_6 = frappe.meta.get_docfield("Time Tracker Detail","day_6", frm.doc.name);
		day_6.label = "Sat (" + frappe.datetime.get_datetime_as_string(frappe.datetime.add_days(frm.doc.from, 5)).split("-")[2].split(" ")[0] + ")";
		var day_7 = frappe.meta.get_docfield("Time Tracker Detail","day_7", frm.doc.name);
		day_7.label = "Sun (" + frappe.datetime.get_datetime_as_string(frappe.datetime.add_days(frm.doc.from, 6)).split("-")[2].split(" ")[0] + ")";

		frm.refresh_fields();
	}
});

frappe.ui.form.on('Time Tracker Detail', {
	day_2: function(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		row.total = row.day_2 + row.day_3 + row.day_4 + row.day_5 + row.day_6 + row.day_7;
		frm.refresh_fields();
	},
	day_3: function(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		row.total = row.day_2 + row.day_3 + row.day_4 + row.day_5 + row.day_6 + row.day_7;
		frm.refresh_fields();
	},
	day_4: function(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		row.total = row.day_2 + row.day_3 + row.day_4 + row.day_5 + row.day_6 + row.day_7;
		frm.refresh_fields();
	},
	day_5: function(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		row.total = row.day_2 + row.day_3 + row.day_4 + row.day_5 + row.day_6 + row.day_7;
		frm.refresh_fields();
	},
	day_6: function(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		row.total = row.day_2 + row.day_3 + row.day_4 + row.day_5 + row.day_6 + row.day_7;
		frm.refresh_fields();
	},
	day_7: function(frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		row.total = row.day_2 + row.day_3 + row.day_4 + row.day_5 + row.day_6 + row.day_7;
		frm.refresh_fields();
	}
	
});
