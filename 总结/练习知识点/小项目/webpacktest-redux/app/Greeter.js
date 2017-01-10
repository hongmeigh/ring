import React,{Component} from 'react';
//用css module 的方式 保存成一个style对象 类名用style.name引入转成 哈希字符串
//import style from './style.css';
import { Router, Route, hashHistory,IndexRoute,Redirect,IndexRedirect,Link,IndexLink,browserHistory  } from 'react-router';
import './style.css';
import img1 from './images/avatar_demo.jpg';
import img2 from './images/avatar_demo.png';
import datajson from './data/student.json';
import { createStore } from 'redux';


const addTodo={
	type:"ADD",
	payload:2
}
const lessTodo={
	type:"LESS",
	payload:3
}
const dateTime={
	type:"DATE",
	payload:1
}
const defaultState = {count:0,countnum:0};
var reducer=(state=defaultState,action)=>{
	switch(action.type){
		case "ADD":
			return {count:state.count+action.payload,countnum:state.countnum}
		case "LESS":
			return {count:state.count-action.payload,countnum:state.countnum}
		case "DATE":
			return {count:state.count,countnum:state.countnum+action.payload}
		default: 
      		return state;	
	}
}
var self;
function listerner() {
  let newState = store.getState();
  self.setState(newState);   
}
const store = createStore(reducer);
store.subscribe(listerner);
var data=datajson.data
// module.exports=function(){
// 	// var greet=document.getElementById("root");
// 	// greet.textContent="how are you";
// 	var Comp=React.createClass({
// 		render:function(){
// 			return (
// 				<div>好好学习 天天向上</div>
// 				)
// 			}
// 	})
// 	return Comp;
// }
class Tablenum extends Component{
	constructor(props){
		super(props);
		this.state={
			data:data
		}
	}
	handleAgedata(){
		var dataarr=data[0];
		data.shift();
		data.sort(function(a,b){
			return a[1]-b[1];
		})
		data.unshift(dataarr)
		this.setState({data:data})
	}
	handleScoredata(){
		var dataarr=data[0];
		data.shift();
		data.sort(function(a,b){
			return a[2]-b[2];
		})
		data.unshift(dataarr)
		this.setState({data:data})
	}
	render(){
		var mp=this.state.data.map(function(elm,index){
					return <tr key={index}>{
						elm.map(function(elm,index){
							return <td key={index}>{elm}</td>
						})
					}</tr>
				})
		return (<div>
					<table className="wid">{mp}</table>
					<button className="btn" onClick={this.handleAgedata.bind(this)}>按年龄排序</button>
					<button className="btn" onClick={this.handleScoredata.bind(this)}>按成绩排序</button>
					<img src={img1}/>
					<img src={img2}/>
					<div className="divwh" style={{background:'url('+img1+') top center no-repeat'}}></div>
					<div className="divwh" style={{background:'url('+img2+') top center no-repeat'}}></div>
				</div>)
	}
}
class Greeter extends Component{
  render() {
    return (
      <div>hello  world 123456789 你好 hello</div>
    );
  }
}
class App extends Component{
  render() {
    return (
      <div>
      	<div>这里是嵌套组件</div>
      	<IndexLink to="/app" activeStyle={{color: 'red'}} activeClassName="font3">根链接</IndexLink>
      	<Link to="/app/page1" activeStyle={{color: 'red'}} activeClassName="font3">链接1</Link>
      	<Link to="/app/page2" activeStyle={{color: 'red'}} activeClassName="font3">链接2</Link>
      	<Link to="/app/page3" activeStyle={{color: 'red'}} activeClassName="font3">链接3</Link>
      	{this.props.children}
      </div>
    );
  }
}
class Home extends Component{
  render() {
    return (
      <div>
      	<div>这里是home主页</div>
      </div>
    );
  }
}
class ReduxAdd extends Component{
	constructor(props){
		super(props);
		this.state={
			count:0,
			countnum:0
		}
		self=this;
		setTimeout(function(){
			store.dispatch(dateTime);
		},10000)
	}
	handleAdd(){
		self=this;
		store.dispatch(addTodo);
	}
	handleless(){
		self=this;
		store.dispatch(lessTodo);
	}
	render() {
    return (
      <div>
      	<div>add值</div>
      	<div>{this.state.count}</div>
      	<button onClick={this.handleAdd.bind(this)}>add</button>
      	<button onClick={this.handleless.bind(this)}>less</button>
      	<div ref="date">{this.state.countnum}</div>
      </div>
    );
  }
}
// class Routerpage extends Component{
// 	render(){
// 		return (
// 			<Router history={hashHistory}>
// 				<Route path="/" component={Tablenum}/>
// 				<Route path="/page" component={Greeter}/>
// 			</Router>
// 			)
// 	}
// }
class Routerpage extends Component{
	render(){
		return (
			<Router history={hashHistory}>
				<Route path="/" component={Greeter}>
					{/*<Redirect from="/app" to="/app/page1"/>*/}
				</Route>
				<Route path="/app" component={App}>
					<IndexRoute component={Home}/>
					{/*<IndexRedirect to="/app/page2" />*/}
					//   /app/page1 这里也可以用相对路径  写成page1
					<Route path="/app/page1" component={Tablenum}/>
					<Route path="/app/page2" component={Greeter}/>
					<Route path="/app/page3" component={ReduxAdd}/>
				</Route>
			</Router>
			)
	}
}
export default Routerpage