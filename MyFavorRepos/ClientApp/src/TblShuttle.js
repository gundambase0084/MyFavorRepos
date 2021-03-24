 import { parseJSON } from 'jquery';
import React from 'react';
 


 
let count = 0;

   const middleBTn = {
       "border":"2px solid rgb(183,187,226)",
	   "color":"rgb(88,96,187)",
	   "background-color":"white",	    
    	 "paddingBottom":10,
    	  "paddingLeft":30,
    	  "paddingRight":30,
   }

class TblShuttle extends React.Component {




    constructor(props) {
        super(props);
        //设定初始值，以便一开始渲染时列表数据为空
        this.state = {
            leftItems: [],
            rightItems: [],
            rightItemsForMail: [],
            rightItemsForMailDetail: [],//从github返回的详细数据
        }


    }


    render() {
        return (
            <div className="layui-row" style={{ marginTop: 30 }}>
                <div className="layui-row">
                    <div className="layui-col-xs5" >
                        <div className="layui-row" style={{ "margin": "0 10px" }}>
                            All Repos from:
			    		<a target='_blank' onClick={this.GetData}>{'https://github.com/idcf-boat-house'}</a>
                        </div>
                        <div className="layui-row" style={{ "margin": "0 10px" }}>
                            <div className="layui-col-xs12" style={{ "border": "3px solid black", "height": "200px" }}>
                                <ul className="left-selected">
                                    {
                                        this.state.leftItems.map((ele, index) => {
                                            return (
                                                <li key={ele.id} onClick={() => this.onClickCheckLeft(ele.id)} >
                                                    <a key={"leftItem" + ele.id} id={"leftItem" + ele.id} style={{ "cursor": "pointer" }}>{ele.name}</a>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div className="layui-col-xs2" style={{ 'textAlign': 'center', 'marginTop': '100px' }}>
                        <div className="layui-row" style={{ 'marginTop': '20px' }}>
                            <button onClick={this.MoveLeft} className={"layui-btn layui-btn-sm"} style={middleBTn}>
                                {'>>>'}
                            </button>
                        </div>
                        <div className="layui-row" style={{ 'marginTop': '20px' }}>
                            <button onClick={this.MoveRight} className={"layui-btn layui-btn-sm"} style={middleBTn}>
                                {'<<<'}
                            </button>
                        </div>
                        <div className="layui-row" style={{ 'marginTop': '20px' }}>

                            <button onClick={this.GenerateMail} className={"layui-btn layui-btn-sm"} style={middleBTn}>
                                {'GenerateMail'}
                            </button>
                        </div>
                    </div>
                    <div className="layui-col-xs5" >
                        <div className="layui-row" style={{ "margin": "0 10px" }}>
                            My Favor Repos
			    	</div>
                        <div className="layui-row" style={{ "margin": "0 10px" }}>
                            <div className="layui-col-xs12" style={{ "border": "3px solid black", "height": "200px" }}>
                                <ul className="right-selected">
                                    {
                                        this.state.rightItems.map((ele, index) => {
                                            return (
                                                <li key={ele.id} onClick={() => this.onClickCheckRight(ele.id)} style={{ "cursor": "pointer" }} >
                                                    <a key={"rightItem" + ele.id} id={"rightItem" + ele.id} style={{ "cursor": "pointer" }}>{ele.name}</a>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="layui-row" style={{ 'margin': '20px 10px 0 10px' }} >
                    <div className="layui-col-xs12">
                        <div className="layui-row" style={{ 'minHeight': '200px', 'border': '3px solid black' }}>
                            <p style={{ 'margin': '20px 10px 0 0' }}>Hello Alan,</p>
                            <p style={{ 'margin': '20px 10px 0 0' }}>This is your favorrepos</p>
                            <ul className="right-selected-mail">
                                {
                                    this.state.rightItemsForMail.map((ele, index) => {
                                        return (
                                            <li><span>{" - " + ele.full_name}</span> <span>{"-" + ele.description}</span>  <a key={index} style={{ "textDecoration": "underline", "color": "blue" }} href={ele.html_url}>{" " + ele.html_url}</a></li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        )
    }


    componentDidMount() {
        //取得repo列表数据
        //todo: 第三方系统API属于系统内部信息，不应该在前端内保存，请将这个内容移动到后端，并且将这个url放入配置文件
        fetch('https://api.github.com/users/idcf-boat-house/repos', {
            method: 'GET',
            mode: 'cors'
        }).then(response => response.json())
            .then(data => {
                let dataFromGithub = [];
                data.map(item => {
                    let _item = {
                        id: item.id,
                        name: item.name,
                        checked: false
                    }
                    dataFromGithub.push(_item);
                })

                if (dataFromGithub.length == 0) alert('获取github数据失败');
                else {
                    //先将左侧数据入库成功则显示在左侧，失败提示
                    fetch('repos/ApplicationStarted', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataFromGithub)
                    }).then(response => response.json())
                        .then(data => {
                            this.setState({
                                leftItems: dataFromGithub,
                            })
                        });
                }
            });
    }

    //右列表点击事件，单击或双击
    onClickCheckRight = (index) => {
        count += 1;
        setTimeout(() => {
            if (count === 1) {
                this.rightItemClick(index);
            } else if (count === 2) {
                this.MoveRightDbl(index);
            }
            count = 0;
        }, 300);
    }

    //左列表点击事件，单击或双击
    onClickCheckLeft = (index) => {
        count += 1;
        setTimeout(() => {
            if (count === 1) {
                this.leftItemClick(index);
            } else if (count === 2) {
                this.MoveLeftDbl(index);
            }
            count = 0;
        }, 300);
    }

    //右列表双击事件
    MoveLeftDbl = (index) => {
        this.leftItemClick(index);
        this.MoveLeft();
    }

    //左列表双击事件
    MoveRightDbl = (index) => {
        this.rightItemClick(index);
        this.MoveRight();
    }

    //邮件生成事件
    GenerateMail = () => {
        fetch('repos/GenerateMailClick', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {}
        }).then(response => response.json()).then(data => {
            //从后台取得tbl_right数据
            let result = parseJSON(data);
            if (result.code == 1) {
                alert(result.msg);
                this.setState({
                    rightItemsForMail: []
                });
                return;
            }
            if (result.data == undefined || result.data.length == undefined || result.data.length == 0) {
                this.setState({
                    rightItemsForMail: []
                });
                return;
            }
            //处理数据唯一标识
            let _idsForDisplay = result.data;
            let itemsInfoMore = [];
            //时间原因没有研究出restapi的搜索语法，先循环取得数据后与后台返回的数据进行了匹配后生成mail内容
            //TODO: 对第三方系统的访问应该放置在api层实现，从前端实现会造成网络请求的跨域请求等很多问题，前端应该只和自己应用的api进行交互
            fetch('https://api.github.com/users/idcf-boat-house/repos', {
                method: 'GET',
                mode: 'cors'
            }).then(response => response.json())
                .then(data => {
                    data.map(item => {
                        if (_idsForDisplay.indexOf(item.id) >= 0) {
                            let _itemMore = {
                                name: item.name,
                                full_name: item.full_name,
                                html_url: item.html_url,
                                description: item.description
                            };
                            itemsInfoMore.push(_itemMore);
                        }
                    })
                    this.setState({
                        rightItemsForMail: itemsInfoMore
                    })
                });
        })
    }

    //左列表单击事件
    leftItemClick = (index) => {
        let items = [...this.state.leftItems];
        items.map(item => {
            if (item.id === index) {
                item.checked = !item.checked;
                document.getElementById("leftItem" + item.id).style.color = 'red';
            }
        })

        this.setState({
            leftItems: items
        })

    }

    //右列表单击事件
    rightItemClick = (index) => {
        let items = [...this.state.rightItems];
        items.map(item => {
            if (item.id === index) {
                item.checked = !item.checked;
                document.getElementById("rightItem" + item.id).style.color = 'red';
            }
        })
        this.setState({
            rightItems: items
        })
    }

    //左向右移动事件
    MoveLeft = () => {
        let items = [...this.state.leftItems];
        let selectedItems = [...this.state.rightItems];
        let notSelect = [];
        items.map(item => {
            if (item.checked === true) {
                item.checked = false;
                return selectedItems.push(item);
            }
            else {
                return notSelect.push(item);
            }

        })
        let inputData = {
            selectedItems: selectedItems,
            type: 'left'
        };
        this.state.leftItems.map(item => {
            document.getElementById("leftItem" + item.id).style.color = '';
        })
        //选中数据先入库成功则显示在右侧，失败提示
        fetch('repos/MoveButtonClick', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
        }).then(response => response.json())
            .then(data => {
                let result = parseJSON(data);
                if (result.code == 1) {
                    alert(result.msg);
                    this.setState({
                        rightItems: [],
                        leftItems: [],
                    });
                    return;
                }
                this.setState({
                    rightItems: selectedItems,
                    leftItems: notSelect,
                })
            });
    }

    //右向左移动事件
    MoveRight = () => {
        let notSelect = [];
        let selectedItems = [...this.state.rightItems];
        let items = [...this.state.leftItems];
        selectedItems.map(item => {
            if (item.checked === true) {
                item.checked = false;
                return items.push(item);
            }
            else {
                return notSelect.push(item);
            }
        })

        this.state.rightItems.map(item => {
            document.getElementById("rightItem" + item.id).style.color = '';
        })

        let inputData = {
            selectedItems: items,
            type: 'right'
        };

        //选中数据先入从库成中删除成功则显示在左侧，失败提示
        fetch('repos/MoveButtonClick', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
        }).then(response => response.json())
          .then(data => {
              let result = parseJSON(data);
              if (result.code == 1) {
                  alert(result.msg);
                  this.setState({
                      rightItems: [],
                      leftItems: [],
                  });
                  return;
              }
              this.setState({
                  rightItems: notSelect,
                  leftItems: items,
              })
          });
    }

}
export default TblShuttle;
 