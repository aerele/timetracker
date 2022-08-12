// Copyright (c) 2022, Aerele Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on('Time Tracker', {
	onload: function (frm) {
		frm.clear_table("totals");
		frm.add_child("totals");
	},
	project: function (frm) {
		frm.set_query("task", "details", function (doc, cdt, cdn) {
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
	teammates: function (frm) {
		frm.set_query("task", "details", function (doc, cdt, cdn) {
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
	from: function (frm) {

		let from_date = new Date(frm.doc.from);
		let day_no = from_date.getDay();
		if (day_no !== 1) {
			frm.set_value("from", frappe.datetime.add_days(frm.doc.from, -1 * (day_no - 1)));
		}
		frm.set_value("to", frappe.datetime.add_days(frm.doc.from, 6));
		frm.refresh_fields();
		let fields_list = ["day_1", "day_2", "day_3", "day_4", "day_5", "day_6", "day_7"];
		let week_days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

		for (let i = 0; i < fields_list.length; i++) {
			var day = frappe.meta.get_docfield("Time Tracker Detail", fields_list[i], frm.doc.name);
			let date = new Date(frappe.datetime.add_days(frm.doc.from, i));
			let day_of_the_week = date.getDay();
			day.label = week_days[day_of_the_week] + "(" + frappe.datetime.get_datetime_as_string(frappe.datetime.add_days(frm.doc.from, i)).split("-")[2].split(" ")[0] + ")";
		}
		frm.refresh_fields();
	}
});

frappe.ui.form.on('Time Tracker Detail', {
	day_2: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		row.total = row.day_2 + row.day_3 + row.day_4 + row.day_5 + row.day_6 + row.day_7;
		frm.refresh_fields();
	},
	day_3: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		row.total = row.day_2 + row.day_3 + row.day_4 + row.day_5 + row.day_6 + row.day_7;
		frm.refresh_fields();
	},
	day_4: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		row.total = row.day_2 + row.day_3 + row.day_4 + row.day_5 + row.day_6 + row.day_7;
		frm.refresh_fields();
	},
	day_5: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		row.total = row.day_2 + row.day_3 + row.day_4 + row.day_5 + row.day_6 + row.day_7;
		frm.refresh_fields();
	},
	day_6: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		row.total = row.day_2 + row.day_3 + row.day_4 + row.day_5 + row.day_6 + row.day_7;
		frm.refresh_fields();
	},
	day_7: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		row.total = row.day_2 + row.day_3 + row.day_4 + row.day_5 + row.day_6 + row.day_7;
		frm.refresh_fields();
	}

});
