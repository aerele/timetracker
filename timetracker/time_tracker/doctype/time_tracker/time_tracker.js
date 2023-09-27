// Copyright (c) 2022, Aerele Technologies and contributors
// For license information, please see license.txt


frappe.ui.form.on('Time Tracker', {
	refresh:function(frm) {
	    window.onbeforeunload = function() {
			if(cur_frm.page.indicator.text() == "Not Saved"){
				return "Data will be lost if you leave the page, are you sure?";
			}
			
		  };
		$('[href="#icon-setting-gear"]').hide()
	},
	onload_post_render:function(frm) {
		window.onbeforeunload = function() {
			if(cur_frm.page.indicator.text() == "Not Saved"){
				return "Data will be lost if you leave the page, are you sure?";
			}
			
		  };
	    frm.set_df_property('details', 'cannot_delete_rows', true);
		frm.set_df_property('details', 'cannot_add_rows', true);
		$('[href="#icon-setting-gear"]').hide()
	},
	details_on_form_rendered:function(frm){
		$('[href="#icon-setting-gear"]').hide()
	},
	form_render:function(frm,cdt,cdn){
            
		$('[href="#icon-setting-gear"]').hide()

           
	}
	
})

// frappe.ui.form.on('Time Tracker Detail', {
   
//       details_add:function(frm,cdt,cdn){
          
//         // $(".icon.icon-sm")[0].outerHTML = '<svg class="icon  icon-sm" style="filter: opacity(0.5);display:none;">\n\t\t\t<use class="" href="#icon-setting-gear"></use>\n\t\t</svg>'
//         	    document.querySelector("#page-Time\\ Tracker > div.container.page-body > div.page-wrapper > div > div.row.layout-main > div > div.layout-main-section > div:nth-child(2) > div > div > div.form-page > div:nth-child(3) > div > div > form > div:nth-child(1) > div > div.form-grid-container > div > div.grid-heading-row > div:nth-child(1) > div > div.col.grid-static-col.d-flex.justify-content-center > a > svg").remove()
//                 var n = frm.doc.test.length;

//         } ,
// 		project:function(frm,cdt,cdn){
// 			var row = locals[cdt][cdn]
// 			if(row.project){
// 				document.querySelector("#page-Time\\ Tracker > div.container.page-body > div.page-wrapper > div > div.row.layout-main > div > div.layout-main-section > div:nth-child(2) > div > div > div.form-page > div:nth-child(3) > div > div > form > div:nth-child(1) > div > div.form-grid-container > div > div.grid-heading-row > div:nth-child(1) > div > div.col.grid-static-col.d-flex.justify-content-center > a > svg").remove()

// 			}
// 		},
// 		task:function(frm,cdt,cdn){
// 			var row = locals[cdt][cdn]
// 			if(row.task){
// 				document.querySelector("#page-Time\\ Tracker > div.container.page-body > div.page-wrapper > div > div.row.layout-main > div > div.layout-main-section > div:nth-child(2) > div > div > div.form-page > div:nth-child(3) > div > div > form > div:nth-child(1) > div > div.form-grid-container > div > div.grid-heading-row > div:nth-child(1) > div > div.col.grid-static-col.d-flex.justify-content-center > a > svg").remove()

// 			}
// 		},
// 		day_1:function(frm,cdt,cdn){
// 			var row = locals[cdt][cdn]
// 			if(row.day_1){
// 				document.querySelector("#page-Time\\ Tracker > div.container.page-body > div.page-wrapper > div > div.row.layout-main > div > div.layout-main-section > div:nth-child(2) > div > div > div.form-page > div:nth-child(3) > div > div > form > div:nth-child(1) > div > div.form-grid-container > div > div.grid-heading-row > div:nth-child(1) > div > div.col.grid-static-col.d-flex.justify-content-center > a > svg").remove()

// 			}
// 		},
// 		day_2:function(frm,cdt,cdn){
// 			var row = locals[cdt][cdn]
// 			if(row.day_2){
// 				document.querySelector("#page-Time\\ Tracker > div.container.page-body > div.page-wrapper > div > div.row.layout-main > div > div.layout-main-section > div:nth-child(2) > div > div > div.form-page > div:nth-child(3) > div > div > form > div:nth-child(1) > div > div.form-grid-container > div > div.grid-heading-row > div:nth-child(1) > div > div.col.grid-static-col.d-flex.justify-content-center > a > svg").remove()

// 			}
// 		},
// 		day_3:function(frm,cdt,cdn){
// 			var row = locals[cdt][cdn]
// 			if(row.day_3){
// 				document.querySelector("#page-Time\\ Tracker > div.container.page-body > div.page-wrapper > div > div.row.layout-main > div > div.layout-main-section > div:nth-child(2) > div > div > div.form-page > div:nth-child(3) > div > div > form > div:nth-child(1) > div > div.form-grid-container > div > div.grid-heading-row > div:nth-child(1) > div > div.col.grid-static-col.d-flex.justify-content-center > a > svg").remove()

// 			}
// 		},
// 		day_4:function(frm,cdt,cdn){
// 			var row = locals[cdt][cdn]
// 			if(row.day_4){
// 				document.querySelector("#page-Time\\ Tracker > div.container.page-body > div.page-wrapper > div > div.row.layout-main > div > div.layout-main-section > div:nth-child(2) > div > div > div.form-page > div:nth-child(3) > div > div > form > div:nth-child(1) > div > div.form-grid-container > div > div.grid-heading-row > div:nth-child(1) > div > div.col.grid-static-col.d-flex.justify-content-center > a > svg").remove()

// 			}
// 		},
// 		day_5:function(frm,cdt,cdn){
// 			var row = locals[cdt][cdn]
// 			if(row.day_5){
// 				document.querySelector("#page-Time\\ Tracker > div.container.page-body > div.page-wrapper > div > div.row.layout-main > div > div.layout-main-section > div:nth-child(2) > div > div > div.form-page > div:nth-child(3) > div > div > form > div:nth-child(1) > div > div.form-grid-container > div > div.grid-heading-row > div:nth-child(1) > div > div.col.grid-static-col.d-flex.justify-content-center > a > svg").remove()

// 			}
// 		},
// 		day_6:function(frm,cdt,cdn){
// 			var row = locals[cdt][cdn]
// 			if(row.day_6){
// 				document.querySelector("#page-Time\\ Tracker > div.container.page-body > div.page-wrapper > div > div.row.layout-main > div > div.layout-main-section > div:nth-child(2) > div > div > div.form-page > div:nth-child(3) > div > div > form > div:nth-child(1) > div > div.form-grid-container > div > div.grid-heading-row > div:nth-child(1) > div > div.col.grid-static-col.d-flex.justify-content-center > a > svg").remove()

// 			}
// 		},
// 		day_7:function(frm,cdt,cdn){
// 			var row = locals[cdt][cdn]
// 			if(row.day_7){
// 				document.querySelector("#page-Time\\ Tracker > div.container.page-body > div.page-wrapper > div > div.row.layout-main > div > div.layout-main-section > div:nth-child(2) > div > div > div.form-page > div:nth-child(3) > div > div > form > div:nth-child(1) > div > div.form-grid-container > div > div.grid-heading-row > div:nth-child(1) > div > div.col.grid-static-col.d-flex.justify-content-center > a > svg").remove()

// 			}
// 		},
        
// })
frappe.ui.form.on('Time Tracker', {
	
	refresh: function (frm) {
		// for(var i=0 ; i < frm.doc.details.length ; i++){
		// 	console.log(frm.doc.details[i])
			
		// }
		frm.set_df_property('details', 'cannot_delete_rows', true);
		frm.set_df_property('details', 'cannot_add_rows', true);

		frm.page.set_indicator(__(""), "")
		if(frappe.user.name !== "Administrator"){
			frm.set_value("user", frappe.user.name)
			frm.set_df_property("user", "read_only", 1);
		}
		// frm.fields_dict.details.grid.grid_buttons.addClass('hidden');
		frm.fields_dict['totals'].grid.wrapper.find('.btn-open-row').hide();// to hide edit button
		frm.fields_dict['totals'].grid.wrapper.find('.grid-heading-row').hide();//to hide header row
		frm.disable_save();
		frm.fields_dict.details.grid.wrapper.find(".indicator-pill").hide();
		frm.refresh_fields();

		//Actions for save button
		frm.add_custom_button(__('Save'), function () {
			let timesheet_list = [...new Set(frm.doc.details.map((item) => { if (item.timesheet !== undefined) return item.timesheet }))];
			timesheet_list = timesheet_list.filter(item => item !== undefined);

			//get all dates from timesheet
			let dates = [];
			let from_date = new Date(frm.doc.from);
			let to_date = new Date(frm.doc.to);
			while (from_date <= to_date) {
				dates.push(frappe.datetime.get_datetime_as_string(from_date).split(" ")[0]);
				from_date.setDate(from_date.getDate() + 1);
			}
			//seperate details from timesheet entry and new entry
			let details_data = frm.doc.details;
			details_data = details_data.filter(item => (item.total && item.total !== "0" && item.submitted !== 1));
			let with_timesheet = [];
			let without_timesheet = [];
			with_timesheet = details_data.filter(item => item.timesheet !== undefined);
			without_timesheet = details_data.filter(item => item.timesheet === undefined);
			// organise data for timesheet entry
			let amend_timesheet = [];
			let new_timesheet = [];
			//for amend timesheet
			for (let i = 0; i < with_timesheet.length; i++) {
				let obj = {
					"timesheet": with_timesheet[i].timesheet,
					"project": with_timesheet[i].project,
					"data": []
				};
				for (let j = 0; j < dates.length; j++) {
					let day = `day_${j + 1}`;
					if (with_timesheet[i][day] && with_timesheet[i][day] !== "0" ) {
						obj.data.push({
							date: dates[j],
							duration: with_timesheet[i][day],
							task: with_timesheet[i].task,
							set_as_favorite: with_timesheet[i].set_as_favorite
						});
					}
				}
				for (let j = 0; j < without_timesheet.length; j++) {
					if (without_timesheet[j].project === with_timesheet[i].project ) {
						for (let k = 0; k < dates.length; k++) {
							let day = `day_${k + 1}`;
							if (without_timesheet[j][day] && without_timesheet[j][day] !== "0") {
								obj.data.push({
									date: dates[k],
									duration: without_timesheet[j][day],
									task: without_timesheet[j].task,
									set_as_favorite:without_timesheet[j].set_as_favorite
								});
							}
						}
					}
				}
				without_timesheet = without_timesheet.filter(item => item.project !== obj.project);
				amend_timesheet.push(obj);
			}
			//get the remaining projects without timesheet entry
			let remaining_projects = [...new Set(without_timesheet.map(item => item.project))];

			//for new timesheet
			for (let i = 0; i < remaining_projects.length; i++) {
				let obj = {
					"project": remaining_projects[i],
					"data": []
				};
				for (let j = 0; j < without_timesheet.length; j++) {
					if (remaining_projects[i] === without_timesheet[j].project) {
						for (let k = 0; k < dates.length; k++) {
							let day = `day_${k + 1}`;
							if (without_timesheet[j][day] && without_timesheet[j][day] !== "0") {
								obj.data.push({
									date: dates[k],
									duration: without_timesheet[j][day],
									task: without_timesheet[j].task,
									set_as_favorite:without_timesheet[j].set_as_favorite
								});
							}
						}
					}
				}
				new_timesheet.push(obj);
			}
			//call the function generate_timesheet from backend
			if(!frm.doc.user){
				frappe.throw("Please Select user to save")
			}
			frappe.call({
				method: "timetracker.time_tracker.doctype.time_tracker.time_tracker.generate_timesheet",
				args: {
					"new_timesheet": new_timesheet,
					"amend_timesheet": amend_timesheet,
					"user": frm.doc.user
				},
				callback: function (r) {
					if (r.message) {
						frappe.show_alert({
							message: __('Timesheets Generated Successfully'),
							indicator: 'green'
						});
						frappe.on_save = 1
						frm.trigger("from");
					}
				}
			});
			frm.page.set_indicator(__(""),"")
		});

		//submit button
		frm.add_custom_button(__('Submit Timesheets'), function () {
			let timesheet_list = [...new Set(frm.doc.details.map((item) => { if (item.timesheet !== undefined && item.submitted !== 1) return item.timesheet }))];
			timesheet_list = timesheet_list.filter(item => item !== undefined);
			if (timesheet_list.length > 0) {
				let message = "Confirm submitting the following timesheets: ";
				for (let i = 0; i < timesheet_list.length ; i++) {
					message += `${timesheet_list[i]} `;
				}
				frappe.confirm(
					message,
					function(){
						//frappe call to submit timesheets
						frappe.call({
							method: "timetracker.time_tracker.doctype.time_tracker.time_tracker.submit_timesheet",
							args: {
								"timesheet_list": timesheet_list,
								"user": frm.doc.user
							},
							callback: function (r) {
								if (r.message) {
									frappe.show_alert({
										message: __('Timesheets Submitted Successfully'),
										indicator: 'green'
									});
									frm.trigger("from");
								}
							}
						});
					},
					function(){
						window.close();
					}
				)
			}
		});
	},
	
	onload: function (frm) {
		$('[href="#icon-setting-gear"]').hide()
		frm.clear_table("totals");
		frm.add_child("totals");
	},

	project: function (frm) {
		let projects = []
		for (let i = 0; i < frm.doc.project.length; i++) { projects.push(frm.doc.project[i].project) }
		if (projects.length !== 0 && frm.doc.from) { frm.trigger("from"); }
	},

	user: function (frm) {
		let projects = []
		for (let i = 0; i < frm.doc.project.length; i++) { projects.push(frm.doc.project[i].project) }
		if (frm.doc.from) { frm.trigger("from"); }
		
	},

	favourite: function (frm) {
		let projects = []
		for (let i = 0; i < frm.doc.project.length; i++) { projects.push(frm.doc.project[i].project) }
		if (frm.doc.from && frm.doc.user) { frm.trigger("from"); }
		
	},

	from: function (frm) {
		// if (frm.doc.project.length === 0) { frappe.throw(__("Please select atleast one project")); }
		$('[href="#icon-setting-gear"]').hide()
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
				freeze:true,
				freeze_message:"Fetching...",
				await : true,
				callback: function (r) {
					frm.clear_table("details");
					frm.clear_table("totals");
					frm.clear_table("tasks");
					frm.add_child("totals");
					for (let j = 0; j < r.message.length; j++) {
						let flag = true;
						if (r.message[j].date) {
							for (let i = 0; i < frm.doc.details.length; i++) {
								if (frm.doc.details[i].task === r.message[j].name && frm.doc.details[i].timesheet === r.message[j].ts_name) {
									flag = false;
									let day_number = dates.indexOf((r.message[j].date).split(" ")[0]) + 1;
									frm.doc.details[i][`day_${day_number}`] = r.message[j].duration * 3600;
									frm.script_manager.trigger(`day_${day_number}`, frm.doc.details[i].doctype, frm.doc.details[i].name);
									frm.refresh_fields();
									break;
								}
							}
						}
						if (flag) {
							let task = frm.add_child("details");
							task.task = r.message[j].name;
							task.set_as_favorite = r.message[j].set_as_fav;
							task.task_name = r.message[j].subject;
							task.project = r.message[j].project;
							task.project_name = r.message[j].project_name;
							task.timesheet = r.message[j].ts_name;
							if (r.message[j].date) {
								let day_number = dates.indexOf((r.message[j].date).split(" ")[0]) + 1;
								task.submitted = r.message[j].submitted ? 1 : 0;
								task[`day_${day_number}`] = r.message[j].duration * 3600;
								frm.script_manager.trigger(`day_${day_number}`, task.doctype, task.name);
							}
							frm.refresh_fields();
						}
					}
					//handling day 1 (monday)	
					for(let i = 0; i < frm.doc.details.length; i++){
						if(!frm.doc.details[i].day_1){
							frm.doc.details[i].day_1 = "0"
						}
					}
					set_task_filter(frm);
				}
			});
		}
		frm.refresh_fields();
		set_task_filter(frm);
		frm.page.set_indicator(__(""), "")
		if(frappe.on_save == 1)
			setTimeout(()=>{
				frm.page.set_indicator(__(""), "")
				frappe.on_save=0
			}, 1000)
		$('[href="#icon-setting-gear"]').hide()
	},


});


frappe.ui.form.on('Time Tracker Detail', {
	details_move:function(frm){
		$('[href="#icon-setting-gear"]').hide()

	},
	details_remove: function (frm) {
		set_task_filter(frm);
		$('[href="#icon-setting-gear"]').hide()

	},

	details_add: function (frm,cdt,cdn) {
		let row = locals[cdt][cdn];
		row.day_1 = "0";
		set_task_filter(frm);
		$('[href="#icon-setting-gear"]').hide()

	},

	task: function (frm) {
		set_task_filter(frm);
		$('[href="#icon-setting-gear"]').hide()

	},

	day_1: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		if(typeof row.day_1 == "string"){
			if(!isValidString(row.day_1)){
				row.day_1 = 0
				row.total = (parseInt(row.day_1 || "0") + parseInt(row.day_2 || "0") + parseInt(row.day_3 || "0") + parseInt(row.day_4 || "0") + parseInt(row.day_5 || "0") + parseInt(row.day_6 || "0") + parseInt(row.day_7 || "0"));
				frappe.msgprint({message:"Invalid Input",
				indicator: 'red',
					clear: false,
				wide:false})
			}
			else{
				row.day_1 = row.day_1.toLowerCase();
				if (row.day_1.includes("m") && row.day_1.includes("h")){
					row.day_1 = (row.day_1.split("h")[0]*3600)+(row.day_1.split("h")[1].split("m")[0]*60)
				}
				
				else if(row.day_1.includes("m") && !row.day_1.includes("h")){
					row.day_1 = (row.day_1.split("m")[0]*60)
				}
				else if(row.day_1.includes("h") && !row.day_1.includes("m") ){
					row.day_1 = (row.day_1.split("h")[0]*3600)
				}
			}
			
		}
		
		compute_total(frm, "day_1");
		row.total = (parseInt(row.day_1 || "0") + parseInt(row.day_2 || "0") + parseInt(row.day_3 || "0") + parseInt(row.day_4 || "0") + parseInt(row.day_5 || "0") + parseInt(row.day_6 || "0") + parseInt(row.day_7 || "0"));
		frm.refresh_fields();
		$('[href="#icon-setting-gear"]').hide()

		
		
	},
	day_2: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		if(typeof row.day_2 == "string"){
			if(!isValidString(row.day_2)){
				row.day_2 = 0
				row.total = (parseInt(row.day_1 || "0") + parseInt(row.day_2 || "0") + parseInt(row.day_3 || "0") + parseInt(row.day_4 || "0") + parseInt(row.day_5 || "0") + parseInt(row.day_6 || "0") + parseInt(row.day_7 || "0"));
				frappe.msgprint({message:"Invalid Input",
				indicator: 'red',
					clear: false,
				wide:false})
			}
			else{
				row.day_2 = row.day_2.toLowerCase();
				if(row.day_2.includes("h") && !row.day_2.includes("m") ){
					row.day_2 = (row.day_2.split("h")[0]*3600)
				}
				else if(row.day_2.includes("m") && !row.day_2.includes("h")){
					row.day_2 = (row.day_2.split("m")[0]*60)
				}
				else if (row.day_2.includes("m") && row.day_2.includes("h")){
					row.day_2 = (row.day_2.split("h")[0]*3600)+(row.day_2.split("h")[1].split("m")[0]*60)
				}
			}
			
		}
		
		compute_total(frm, "day_2");
		row.total = (parseInt(row.day_1 || "0") + parseInt(row.day_2 || "0") + parseInt(row.day_3 || "0") + parseInt(row.day_4 || "0") + parseInt(row.day_5 || "0") + parseInt(row.day_6 || "0") + parseInt(row.day_7 || "0"));
		frm.refresh_fields();
		$('[href="#icon-setting-gear"]').hide()

	},
	day_3: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		if(typeof row.day_3 == "string"){
			if(!isValidString(row.day_3)){
				row.day_3 = 0
				row.total = (parseInt(row.day_1 || "0") + parseInt(row.day_2 || "0") + parseInt(row.day_3 || "0") + parseInt(row.day_4 || "0") + parseInt(row.day_5 || "0") + parseInt(row.day_6 || "0") + parseInt(row.day_7 || "0"));
				frappe.msgprint({message:"Invalid Input",
				indicator: 'red',
					clear: false,
				wide:false})
			}
			else{
				row.day_3 = row.day_3.toLowerCase();
				if(row.day_3.includes("h") && !row.day_3.includes("m") ){
					row.day_3 = (row.day_3.split("h")[0]*3600)
				}
				else if(row.day_3.includes("m") && !row.day_3.includes("h")){
					row.day_3 = (row.day_3.split("m")[0]*60)
				}
				else if (row.day_3.includes("m") && row.day_3.includes("h")){
					row.day_3 = (row.day_3.split("h")[0]*3600)+(row.day_3.split("h")[1].split("m")[0]*60)
				}
			}
			
		}
		compute_total(frm, "day_3");
		row.total = (parseInt(row.day_1 || "0") + parseInt(row.day_2 || "0") + parseInt(row.day_3 || "0") + parseInt(row.day_4 || "0") + parseInt(row.day_5 || "0") + parseInt(row.day_6 || "0") + parseInt(row.day_7 || "0"));
		frm.refresh_fields();
		$('[href="#icon-setting-gear"]').hide()

	},
	day_4: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		if(typeof row.day_4 == "string"){
			if(!isValidString(row.day_4)){
				row.day_4 = 0
				row.total = (parseInt(row.day_1 || "0") + parseInt(row.day_2 || "0") + parseInt(row.day_3 || "0") + parseInt(row.day_4 || "0") + parseInt(row.day_5 || "0") + parseInt(row.day_6 || "0") + parseInt(row.day_7 || "0"));
				frappe.msgprint({message:"Invalid Input",
				indicator: 'red',
					clear: false,
				wide:false})
			}
			else{
				row.day_4 = row.day_4.toLowerCase();
				if(row.day_4.includes("h") && !row.day_4.includes("m") ){
					row.day_4 = (row.day_4.split("h")[0]*3600)
				}
				else if(row.day_4.includes("m") && !row.day_4.includes("h")){
					row.day_4 = (row.day_4.split("m")[0]*60)
				}
				else if (row.day_4.includes("m") && row.day_4.includes("h")){
					row.day_4 = (row.day_4.split("h")[0]*3600)+(row.day_4.split("h")[1].split("m")[0]*60)
				}
			}
			
		}
		compute_total(frm, "day_4");
		row.total = (parseInt(row.day_1 || "0") + parseInt(row.day_2 || "0") + parseInt(row.day_3 || "0") + parseInt(row.day_4 || "0") + parseInt(row.day_5 || "0") + parseInt(row.day_6 || "0") + parseInt(row.day_7 || "0"));
		frm.refresh_fields();
		$('[href="#icon-setting-gear"]').hide()

	},
	day_5: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		if(typeof row.day_5 == "string"){
			if(!isValidString(row.day_5)){
				row.day_5 = 0
				row.total = (parseInt(row.day_1 || "0") + parseInt(row.day_2 || "0") + parseInt(row.day_3 || "0") + parseInt(row.day_4 || "0") + parseInt(row.day_5 || "0") + parseInt(row.day_6 || "0") + parseInt(row.day_7 || "0"));
				frappe.msgprint({message:"Invalid Input",
				indicator: 'red',
					clear: false,
				wide:false})
			}
			else{
				row.day_5 = row.day_5.toLowerCase();
				if(row.day_5.includes("h") && !row.day_5.includes("m") ){
					row.day_5 = (row.day_5.split("h")[0]*3600)
				}
				else if(row.day_5.includes("m") && !row.day_5.includes("h")){
					row.day_5 = (row.day_5.split("m")[0]*60)
				}
				else if (row.day_5.includes("m") && row.day_5.includes("h")){
					row.day_5 = (row.day_5.split("h")[0]*3600)+(row.day_5.split("h")[1].split("m")[0]*60)
				}
			}
			
		}
		compute_total(frm, "day_5");
		row.total = (parseInt(row.day_1 || "0") + parseInt(row.day_2 || "0") + parseInt(row.day_3 || "0") + parseInt(row.day_4 || "0") + parseInt(row.day_5 || "0") + parseInt(row.day_6 || "0") + parseInt(row.day_7 || "0"));
		frm.refresh_fields();
		$('[href="#icon-setting-gear"]').hide()

	},
	day_6: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		if(typeof row.day_6 == "string"){
			if(!isValidString(row.day_6)){
				row.day_6 = 0
				row.total = (parseInt(row.day_1 || "0") + parseInt(row.day_2 || "0") + parseInt(row.day_3 || "0") + parseInt(row.day_4 || "0") + parseInt(row.day_5 || "0") + parseInt(row.day_6 || "0") + parseInt(row.day_7 || "0"));
				frappe.msgprint({message:"Invalid Input",
				indicator: 'red',
					clear: false,
				wide:false})
			}
			else{
				row.day_6 = row.day_6.toLowerCase();
				if(row.day_6.includes("h") && !row.day_6.includes("m") ){
					row.day_6 = (row.day_6.split("h")[0]*3600)
				}
				else if(row.day_6.includes("m") && !row.day_6.includes("h")){
					row.day_6 = (row.day_6.split("m")[0]*60)
				}
				else if (row.day_6.includes("m") && row.day_6.includes("h")){
					row.day_6 = (row.day_6.split("h")[0]*3600)+(row.day_6.split("h")[1].split("m")[0]*60)
				}
			}
			
		}
		compute_total(frm, "day_6");
		row.total = (parseInt(row.day_1 || "0") + parseInt(row.day_2 || "0") + parseInt(row.day_3 || "0") + parseInt(row.day_4 || "0") + parseInt(row.day_5 || "0") + parseInt(row.day_6 || "0") + parseInt(row.day_7 || "0"));
		frm.refresh_fields();
		$('[href="#icon-setting-gear"]').hide()

	},
	day_7: function (frm, cdt, cdn) {
		let row = locals[cdt][cdn];
		if(typeof row.day_7 == "string"){
			if(!isValidString(row.day_7)){
				row.day_7 = 0
				row.total = (parseInt(row.day_1 || "0") + parseInt(row.day_2 || "0") + parseInt(row.day_3 || "0") + parseInt(row.day_4 || "0") + parseInt(row.day_5 || "0") + parseInt(row.day_6 || "0") + parseInt(row.day_7 || "0"));
				frappe.msgprint({message:"Invalid Input",
				indicator: 'red',
					clear: false,
				wide:false})
			}
			else{
				row.day_7 = row.day_7.toLowerCase();
				if(row.day_7.includes("h") && !row.day_7.includes("m") ){
					row.day_7 = (row.day_7.split("h")[0]*3600)
				}
				else if(row.day_7.includes("m") && !row.day_7.includes("h")){
					row.day_7 = (row.day_7.split("m")[0]*60)
				}
				else if (row.day_7.includes("m") && row.day_7.includes("h")){
					row.day_7 = (row.day_7.split("h")[0]*3600)+(row.day_7.split("h")[1].split("m")[0]*60)
				}
			}
			
		}
		compute_total(frm, "day_7");
		row.total = (parseInt(row.day_1 || "0") + parseInt(row.day_2 || "0") + parseInt(row.day_3 || "0") + parseInt(row.day_4 || "0") + parseInt(row.day_5 || "0") + parseInt(row.day_6 || "0") + parseInt(row.day_7 || "0"));
		frm.refresh_fields();
		$('[href="#icon-setting-gear"]').hide()

	}
});

const compute_total = function (frm, day) {
	frm.doc.totals[0].day_wise_total = "Date Wise Total"
	let total = 0;
	for (let i = 0; i < frm.doc.details.length; i++)
		total += parseInt(frm.doc.details[i][day]);
	frm.doc.totals[0][day] = total;
	frm.doc.totals[0]["total"] = 	parseInt(frm.doc.totals[0]["day_1"] || "0") + 
									parseInt(frm.doc.totals[0]["day_2"] || "0") + 
									parseInt(frm.doc.totals[0]["day_3"] || "0") + 
									parseInt(frm.doc.totals[0]["day_4"] || "0") + 
									parseInt(frm.doc.totals[0]["day_5"] || "0") + 
									parseInt(frm.doc.totals[0]["day_6"] || "0") + 
									parseInt(frm.doc.totals[0]["day_7"] || "0");
	frm.page.set_indicator(__("Not Saved"), "orange")
	frm.refresh_fields();
}

function isValidString(inputString) {
	if(inputString == "hm" || inputString == "0hm" || inputString == "h0m"){
		inputString = "0h0m"
	}
	const lowercaseString = inputString.toLowerCase();
	let hCount = 0;
	let mCount = 0;
  
	for (const char of lowercaseString) {
	  if (char === 'h') hCount++;
	  else if (char === 'm') mCount++;
	  else if (!/\d/.test(char)) return false; // Return false if any other character is found
	}
  
	return hCount === 1 && mCount === 1;
  }
  

const set_task_filter = (frm) => {
	let projects = []
	let tasks = []
	
	for (let i = 0; i < frm.doc.project.length; i++) { projects.push(frm.doc.project[i].project) }
	for (let i = 0; i < frm.doc.details.length; i++) { 
		if(frm.doc.details[i]["submitted"] !== 1) tasks.push(frm.doc.details[i].task) 
	}
	frm.set_query("task", "details", function (doc, cdt, cdn) {
		return {
			filters: {
				project: ["in", projects],
				name:["not in", tasks],
				is_group:1
			}
		};
	});
	frm.refresh_fields();
	$('[href="#icon-setting-gear"]').hide()
}