import React, { Component } from 'react'
import axios from 'axios'
import ReactJson from 'react-json-view'
import './App.css'

class App extends Component {

	getAddress = 'http://192.168.212.162:8080/ipb-app/services/platform-rs/dev/v1/localdate';
	postAddress = 'http://192.168.212.162:8080/ipb-app/services/platform-rs/dev/v1/localdate/date';


	constructor () {
    super();

		this.state = {
			name: '',
      getReturn: '',
			postJSON: '',
			postReturn: '',
			date: '',
			localDate: '',
			jsonObject: {
				"name": null,
			  "localDate":null,
			  "date":null,
			  "timeZone": "GB"
			}
    }

		this.jsonObject = {
		  "name": null,
		  "localDate":null,
		  "date":null,
		  "timeZone": "GB"
		}

    this.handleGET = this.handleGET.bind(this)
		this.handleGETobject = this.handleGETobject.bind(this)
    this.handlePOST = this.handlePOST.bind(this)
		this.handlePOSTjson = this.handlePOSTjson.bind(this)
  }

  render () {
    return (
      <div className='button__container'>
			<table>
				<thead>
					<tr>
						<th>Action</th>
						<th>Address</th>
						<th>Input</th>
						<th>Result</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><button className='button' onClick={this.handlePOST}>POST String JSON</button></td>
						<td>{this.postAddress}</td>
						<td><input type="text" id="name" value={this.state.postJSON} onChange={ (e) => this.handlePOSTinput(e) } /></td>
						<td><ReactJson src={this.state.postReturn} /></td>
					</tr>
					<tr>
						<td><button className='button' onClick={this.handlePOSTjson}>POST Object JSON</button></td>
						<td>{this.postAddress}</td>
						<td>
							<table>
							<tbody>
								<tr>
									<td><label for="name">Name</label></td>
									<td><input type="text" id="name" value={this.name} onChange={ (e) => this.handleNameInput(e) } /><br/><br/></td>
								</tr>
								<tr>
									<td><label for="localDate">"new Date(string)" for localDate</label></td>
									<td><input type="text" id="localDate" value={this.state.localDate} onChange={ (e) => this.handleLocalDateInput(e) } /><br/><br/></td>
								</tr>
								<tr>
									<td><label for="date">"new Date(string)" for date</label></td>
									<td><input type="text" id="date" value={this.state.date} onChange={ (e) => this.handleDateInput(e) } /></td>
								</tr>
								<tr>
									<td>Posted JSON Object:</td>
									<td>{JSON.stringify(this.jsonObject, null, 2) }</td>
								</tr>
							</tbody>
							</table>
						</td>
						<td><ReactJson src={this.state.postReturn} /></td>
					</tr>
					<tr>
						<td><button className='button' onClick={this.handleGET}>GET</button> </td>
						<td>{this.getAddress}</td>
						<td></td>
						<td><ReactJson src={this.state.getReturn} /></td>
					</tr>
					<tr>
						<td> <button className='button' onClick={this.handleGETobject}>GET to object</button></td>
						<td>{this.getAddress}</td>
						<td></td>
						<td> <ReactJson src={this.state.jsonObject} /></td>
					</tr>
				</tbody>
			</table>
      </div>
    )
  }

  handleGET () {
    console.log('handleGET!')
		axios.get(this.getAddress, {headers: {
        "Authorization" : "Basic cWE6cWE="
      }
    }).then(response => this.setState({getReturn: response.data}))
  }

	handleGETobject () {
    console.log('handleGETObject!')
		axios.get(this.getAddress, {headers: {
        "Authorization" : "Basic cWE6cWE="
      }
    }).then(response => this.setState({jsonObject: response.data}))
  }

  handlePOST () {
    console.log('handlePOST!')
		axios.post(this.postAddress,
			this.state.postJSON,
			{headers: {"Authorization" : "Basic cWE6cWE=",'Content-Type': 'application/json'}}
		).then(response => this.setState({postReturn: response.data}));
  }

	handlePOSTjson () {
		this.jsonObject.name = this.state.name;
		this.jsonObject.localDate = new Date(this.state.localDate);
		this.jsonObject.date = new Date(this.state.date);

		console.log(this.jsonObject)

		axios.post(this.postAddress,
			this.jsonObject,
			{headers: {"Authorization" : "Basic cWE6cWE=",'Content-Type': 'application/json'}}
		).then(response => this.setState({postReturn: response.data}));
  }

	handlePOSTinput(e) {
    this.setState({
      postJSON: e.target.value
    });
  }

	handleNameInput(e) {
		this.setState({
      name: e.target.value
    });
		console.log(this.state.name)
  }

	handleLocalDateInput(e) {
		this.setState({
      localDate: e.target.value
    });
	}

	handleDateInput(e) {
		this.setState({
			date: e.target.value
		});
  }

}
export default App
