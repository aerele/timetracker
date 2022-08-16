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

			return {
				filters: {
					project: ["in", projects],
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

			return {
				filters: {
					project: ["in", projects],
					// assignee: ["in", mates]
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
			let date = new Date(frappe.datetime.add_days(frm.doc.from, i));
			let day_of_the_week = date.getDay();
			var day = frappe.meta.get_docfield("Time Tracker Detail", fields_list[i], frm.doc.name);
			day.label = week_days[day_of_the_week] + "(" + frappe.datetime.get_datetime_as_string(frappe.datetime.add_days(frm.doc.from, i)).split("-")[2].split(" ")[0] + ")";
			var day = frappe.meta.get_docfield("Time Tracker Total", fields_list[i], frm.doc.name);
			// day.label = week_days[day_of_the_week] + "(" + frappe.datetime.get_datetime_as_string(frappe.datetime.add_days(frm.doc.from, i)).split("-")[2].split(" ")[0] + ")";
			day.label = week_days[day_of_the_week] + "(" + frappe.datetime.get_datetime_as_string(frappe.datetime.add_days(frm.doc.from, i)).split("-")[2].split(" ")[0] + ")";
		}

		if (day_no === 1) {
			frappe.call({
				method: "timetracker.time_tracker.doctype.time_tracker.time_tracker.get_tasks",
				args: {
					projects: frm.doc.project
				},
				callback: function (r) {
					for (let j = 0; j < r.message.length; j++) {
						let task = frm.add_child("details");
						task.task = r.message[j].name;
						task.task_name = r.message[j].subject;
						task.project = r.message[j].project;
						frm.refresh_fields();
					}
				}
			});
		}
		frm.refresh_fields();
	},
	

});


frappe.ui.form.on('Time Tracker Detail', {

	details_add: function (frm) {
		console.log("details_add");
	},
	task: function (frm) {
		console.log("task");
	},
	day_1: function (frm, cdt, cdn) {
		console.log({cdt , cdn});
		let row = locals[cdt][cdn];
		compute_total(frm,"day_1");
		row.total = (parseInt(row.day_1) +  parseInt(row.day_2) +  parseInt(row.day_3) + parseInt(row.day_4) + parseInt(row.day_5) + parseInt(row.day_6) + parseInt(row.day_7));
		frm.refresh_fields();
	},
	day_2: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		compute_total(frm,"day_2");
		row.total = (parseInt(row.day_1) +  parseInt(row.day_2) +  parseInt(row.day_3) + parseInt(row.day_4) + parseInt(row.day_5) + parseInt(row.day_6) + parseInt(row.day_7));
		frm.refresh_fields();
	},
	day_3: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		compute_total(frm,"day_3");
		row.total = (parseInt(row.day_1) +  parseInt(row.day_2) +  parseInt(row.day_3) + parseInt(row.day_4) + parseInt(row.day_5) + parseInt(row.day_6) + parseInt(row.day_7));
		frm.refresh_fields();
	},
	day_4: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		compute_total(frm,"day_4");
		row.total = (parseInt(row.day_1) +  parseInt(row.day_2) +  parseInt(row.day_3) + parseInt(row.day_4) + parseInt(row.day_5) + parseInt(row.day_6) + parseInt(row.day_7));
		frm.refresh_fields();
	},
	day_5: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		compute_total(frm,"day_5");
		row.total = (parseInt(row.day_1) +  parseInt(row.day_2) +  parseInt(row.day_3) + parseInt(row.day_4) + parseInt(row.day_5) + parseInt(row.day_6) + parseInt(row.day_7));
		frm.refresh_fields();
	},
	day_6: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		compute_total(frm,"day_6");
		row.total = (parseInt(row.day_1) +  parseInt(row.day_2) +  parseInt(row.day_3) + parseInt(row.day_4) + parseInt(row.day_5) + parseInt(row.day_6) + parseInt(row.day_7));
		frm.refresh_fields();
	},
	day_7: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		compute_total(frm,"day_7");
		row.total = (parseInt(row.day_1) +  parseInt(row.day_2) +  parseInt(row.day_3) + parseInt(row.day_4) + parseInt(row.day_5) + parseInt(row.day_6) + parseInt(row.day_7));
		frm.refresh_fields();
	}
});


const compute_total = function (frm, day) {
	let total = 0;
	for (let i = 0; i < frm.doc.details.length; i++)
		total += parseInt(frm.doc.details[i][day]);
	frm.doc.totals[0][day] = total;
	frm.doc.totals[0]["total"] = parseInt(frm.doc.totals[0]["day_1"]) + parseInt(frm.doc.totals[0]["day_2"]) + parseInt(frm.doc.totals[0]["day_3"]) + parseInt(frm.doc.totals[0]["day_4"]) + parseInt(frm.doc.totals[0]["day_5"]) + parseInt(frm.doc.totals[0]["day_6"]) + parseInt(frm.doc.totals[0]["day_7"]);
	frm.refresh_fields();
}



















const add_total_row = (frm) => {
	console.log("add_total_row");
	let total_row = frm.add_child("details");
	total_row.task = "Total";
	frm.refresh_fields();
}

const remove_total_row = (frm) => {
	console.log("remove_total_row");
	console.log(frm.doc.details);
	let table_data = frm.doc.details;
	frm.doc.details = [];
	frm.refresh_fields();
	for (let i = 0; i < table_data.length - 1; i++) {
		if (table_data[i].task != "Total") {
			let task = frm.add_child("details");
			task.task = table_data[i].task || "";
			task.task_name = table_data[i].task_name || "";
			task.project = table_data[i].project || "";
			task.day_1 = table_data[i].day_1 || 0;
			task.day_2 = table_data[i].day_2 || 0;
			task.day_3 = table_data[i].day_3 || 0;
			task.day_4 = table_data[i].day_4 || 0;
			task.day_5 = table_data[i].day_5 || 0;
			task.day_6 = table_data[i].day_6 || 0;
			task.day_7 = table_data[i].day_7 || 0;
			task.total = table_data[i].total || 0;
			frm.refresh_fields();
		}
	}
	frm.refresh_fields();
}
