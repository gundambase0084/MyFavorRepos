import React from 'react';
 
 
 const searchStyle1={
 "display":"inline-block",
 "padding":"15px 15px",
 "color":"white"
}
 
class Search extends React.Component{
    render(){
        return (
        <div className="layui-row" style={{textAlign:"center"}} >
			<div className="layui-col-xs12"  style={{backgroundColor:"rgb(102,102,102)",borderRadius:"10 10",height:50}}>
			<div className="layui-col-xs1">	
				<i style={searchStyle1}>左箭头</i>
			</div>
			<div className="layui-col-xs1">	
				<i style={searchStyle1}>右箭头</i></div>
			<div className="layui-col-xs1">	
				<i style={searchStyle1}>刷新</i></div>
			<div className="layui-col-xs8">
                <input type='text' className="layui-input" style={{margin:10,height:30}} />
			</div>
			<div className="layui-col-xs1">	
				<i style={searchStyle1}>取消</i></div>
			</div>
	    </div>
        )
    }
}
export default Search;
 