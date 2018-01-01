const html = require('bel');

function InvoiceForm(current){
	var hourList = current.jobs.map(job => job.total_hours);
	
	var i_date = new Date();
	var d_date = new Date();
	d_date.setDate(i_date.getDate() + 30);

	return html`<div id="${current.client.prefix}-${new Date(current.date).getFullYear()}-${current.id}" class="invoice-form">
		<header id="info-header">
			
			<section id="info-header__vendor">
				<h4>${current.vendor.name}</h4>
				<div class="info-header__vendor-street_addr">
					${current.vendor.street_addr}
				</div>
				<div class="info-header__vendor-addr">
					${current.vendor.town_city}
					${current.vendor.state_province}
					${current.vendor.post_code}
					${current.vendor.country}
				</div>
				<div class="info-header__vendor-email">
					${current.vendor.email_addr}
				</div>
				<div class="info-header__vendor-phone">
					${current.vendor.phone_num}
				</div>
			</section>
			<section id="info-header__client"></section>
			<section id="info-header__invoice">
				<h2>Invoice</h2>
				<div class="info-header__invoice-number">
					<strong>Invoice #:</strong> ${current.client.prefix}-${i_date.getFullYear()}-${current.id}
				</div>
				<div class="info-header__invoice-date">
					<strong>Invoice Date:</strong> ${i_date.toDateString()}
				</div>
				<div class="info-header__invoice-due">
					<strong>Invoice Due:</strong> ${d_date.toDateString()}
				</div>	
			</section>
		</header>

		<hr />
		<main class="container">
			<table id="hours-table">
				<tr>
					<th>
						<h6>Date</h6>
					</th>
					<th>
						<h6>Job ID</h6>
					</th>
					<th>
						<h6>Description</h6>
					</th>
					<th>
						<h6>Hours</h6>
					</th>
					<th>
						<h6>Rate per Hour</h6>
					</th>
				</tr>
				${current.jobs.sort((a, b) => a.job_date > b.job_date).map(job => {
					var d = new Date(job.job_date),
						month = parseInt(d.getMonth() + 1) >= 10 ? parseInt(d.getMonth() + 1) : `0${parseInt(d.getMonth() + 1)}`,
						day = parseInt(d.getDate()) >= 10 ? d.getDate() : `0${d.getDate()}`,
						year = d.getFullYear();

					return html`<tr>
						<td>
							${month}/${day}/${year}
						</td>
						<td>${job.job_id}</td>
						<td>${job.description}</td>
						<td>${job.total_hours.toFixed(2)}</td>
						<td>${job.rate}</td>
					</tr>`;
				})}

				<tr id="totals-row">
					<td colspan="3">
						<h4>Totals</h4>
					</td>
					<td>
						<h5>${hourList.length ? hourList.reduce((a, b) => a + b).toFixed(2) : '0'}</h5>
					</td>
					<td>
						<h5>${hourList.length ? `$${(hourList.reduce((a,b) => a + b) * parseFloat(current.jobs[0].rate.substr(1))).toFixed(2)}` : '$0.00'}</h5>
					</td>
				</tr>

			</table>
	</div>`;
}

module.exports = InvoiceForm;