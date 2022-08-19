// Copyright (c) 2022, Aerele Technologies and contributors
// For license information, please see license.txt


frappe.ui.form.on('Time Tracker', {

	refresh: function (frm,) {
		frm.fields_dict['totals'].grid.wrapper.find('.btn-open-row').hide();// to hide edit button
		frm.fields_dict['totals'].grid.wrapper.find('.grid-heading-row').hide();//to hide header row
		frm.disable_save(); 
		frm.refresh_fields();
		frm.fields_dict.details.grid.wrapper.find(".indicator-pill").hide();

		frm.add_custom_button(__('Generate Timesheets'), function(){
			frappe.show_alert({
				message: __('Timesheets Generated Successfully'),
				indicator: 'green'
			});
		});

		frm.add_custom_button(__('Submit Timesheets'), function(){
			frappe.show_alert({
				message: __('Timesheets Submitted Successfully'),
				indicator: 'green'
			});
		});
	},

	onload: function (frm) {
		frm.clear_table("totals");
		frm.add_child("totals");
	},

	project: function (frm) {
		let projects = []
		for (let i = 0; i < frm.doc.project.length; i++) { projects.push(frm.doc.project[i].project) }
		if(projects.length !== 0 && frm.doc.from){ frm.trigger("from"); }
		frm.set_query("task", "details", function (doc, cdt, cdn) {
			return {
				filters: {
					project: ["in", projects]
				}
			};
		});
	},

	user: function (frm) {
		let projects = []
		for (let i = 0; i < frm.doc.project.length; i++) { projects.push(frm.doc.project[i].project) }
		if(projects.length !== 0 && frm.doc.from){ frm.trigger("from"); }
		frm.set_query("task", "details", function (doc, cdt, cdn) {
			return {
				filters: {
					project: ["in", projects]
				}
			};
		});
	},

	favourite: function (frm) {
		let projects = []
		for (let i = 0; i < frm.doc.project.length; i++) { projects.push(frm.doc.project[i].project) }
		if(projects.length !== 0 && frm.doc.from && frm.doc.user){ frm.trigger("from"); }
	},

	from: function (frm) {
		if(frm.doc.project.length === 0){ frappe.throw(__("Please select atleast one project")); }
		let from_date = new Date(frm.doc.from);
		let day_no = from_date.getDay();
		if (day_no !== 1) { frm.set_value("from", frappe.datetime.add_days(frm.doc.from, -1 * (day_no - 1))); }
		frm.set_value("to", frappe.datetime.add_days(frm.doc.from, 6));
		frm.refresh_fields();

		//change the lables of details table columns
		let fields_list = ["day_1", "day_2", "day_3", "day_4", "day_5", "day_6", "day_7"];
		let week_days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		for (let i = 0; i < fields_list.length; i++) {
			let date = new Date(frappe.datetime.add_days(frm.doc.from, i));
			let day_of_the_week = date.getDay();
			var day = frappe.meta.get_docfield("Time Tracker Detail", fields_list[i], frm.doc.name);
			day.label = week_days[day_of_the_week] + "(" + frappe.datetime.get_datetime_as_string(frappe.datetime.add_days(frm.doc.from, i)).split("-")[2].split(" ")[0] + ")";
		}

		if (day_no === 1) {
			let mates = [frm.doc.user]
			let projects = []
			for (let i = 0; i < frm.doc.project.length; i++) { projects.push(frm.doc.project[i].project) }
			let dates = [];
			let from_date = new Date(frm.doc.from);
			let to_date = new Date(frm.doc.to);
			while (from_date <= to_date) {
				dates.push(frappe.datetime.get_datetime_as_string(from_date).split(" ")[0]);
				from_date.setDate(from_date.getDate() + 1);
			}

			frappe.call({
				method: "timetracker.time_tracker.doctype.time_tracker.time_tracker.get_tasks",
				args: {
					projects: projects,
					favourite: frm.doc.favourite,
					user: mates,
					from_date: frm.doc.from,
					to_date: frm.doc.to
				},
				callback: function (r) {
					frm.clear_table("details");
					frm.clear_table("totals");
					frm.add_child("totals");
					for (let j = 0; j < r.message.length; j++) {
						let task = frm.add_child("details");
						task.task = r.message[j].name;
						task.task_name = r.message[j].subject;
						task.project = r.message[j].project;
						if(r.message[j].date){
							let day_number = dates.indexOf((r.message[j].date).split(" ")[0]) + 1;
							console.log({date:(r.message[j].date).split(" ")[0],day_number});
							task[`day_${day_number}`] = r.message[j].duration * 3600;
							frm.script_manager.trigger(`day_${day_number}`, task.doctype, task.name);
						}
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
	},

	task: function (frm) {
	},

	day_1: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		compute_total(frm, "day_1");
		row.total = (parseInt(row.day_1) + parseInt(row.day_2) + parseInt(row.day_3) + parseInt(row.day_4) + parseInt(row.day_5) + parseInt(row.day_6) + parseInt(row.day_7));
		frm.refresh_fields();
	},
	day_2: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		compute_total(frm, "day_2");
		row.total = (parseInt(row.day_1) + parseInt(row.day_2) + parseInt(row.day_3) + parseInt(row.day_4) + parseInt(row.day_5) + parseInt(row.day_6) + parseInt(row.day_7));
		frm.refresh_fields();
	},
	day_3: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		compute_total(frm, "day_3");
		row.total = (parseInt(row.day_1) + parseInt(row.day_2) + parseInt(row.day_3) + parseInt(row.day_4) + parseInt(row.day_5) + parseInt(row.day_6) + parseInt(row.day_7));
		frm.refresh_fields();
	},
	day_4: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		compute_total(frm, "day_4");
		row.total = (parseInt(row.day_1) + parseInt(row.day_2) + parseInt(row.day_3) + parseInt(row.day_4) + parseInt(row.day_5) + parseInt(row.day_6) + parseInt(row.day_7));
		frm.refresh_fields();
	},
	day_5: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		compute_total(frm, "day_5");
		row.total = (parseInt(row.day_1) + parseInt(row.day_2) + parseInt(row.day_3) + parseInt(row.day_4) + parseInt(row.day_5) + parseInt(row.day_6) + parseInt(row.day_7));
		frm.refresh_fields();
	},
	day_6: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		compute_total(frm, "day_6");
		row.total = (parseInt(row.day_1) + parseInt(row.day_2) + parseInt(row.day_3) + parseInt(row.day_4) + parseInt(row.day_5) + parseInt(row.day_6) + parseInt(row.day_7));
		frm.refresh_fields();
	},
	day_7: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		compute_total(frm, "day_7");
		row.total = (parseInt(row.day_1) + parseInt(row.day_2) + parseInt(row.day_3) + parseInt(row.day_4) + parseInt(row.day_5) + parseInt(row.day_6) + parseInt(row.day_7));
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
