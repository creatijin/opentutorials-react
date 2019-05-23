import React, { Component } from 'react';
import Toc from "./components/Toc";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state={
      mode:"welcome",
      selected_content_id:1,
      welcome:{title:"welcome", desc:"Hello React!!!"},
      subject:{title:"WEB",subtxt:"world wide web!"},
      contents:[
        {id:1, title:'HTML', desc:'HTML is HyperText Markup Language.'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'Javascript', desc:'Javascript is for interactive'}
      ]
    }
  }
  getReadContent() {
    var i = 0;
    while(i < this.state.contents.length) {
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id) {
        return data;
      }
      i = i + 1;
    }
  }
  getConten() {
    var _title, _desc, _article, _content, _contents = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === "read") {
      _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    } else if ( this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
        // add content to this.satate.contents
        this.max_content_id = this.max_content_id + 1 ;
  
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // )
        // _contents = this.state.contents.concat(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // )
        _contents = Array.from(this.state.contents)
        _contents.push({id:this.max_content_id, title:_title, desc:_desc})
        //Array.from을 사용해서 복제 후 .push로 데이터 값을 넣어줄 수 있다.

        //state에 값을 추가할때는 오리지널 데이터를 변경하는걸 쓰지말고 ex).push()
        //오리지널 데이터를 변경하지 않고 새로운 데이터를 추가하는걸 사용해라 ex).concat()
        this.setState({
          contents:_contents,
          mode: 'read',
          selected_content_id: this.max_content_id
        })
      }.bind(this)}></CreateContent>;
    } else if ( this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
        _contents = Array.from(this.state.contents);
        //오리지널 content를 변경하지 않고 Array.from로 복제해서 사용
        var i = 0;
        while( i < _contents.length ) {
          if( _contents[i].id === _id ) {
            _contents[i] = {id:_id, title:_title, desc:_desc}
            break;
          }
          i = i + 1;
        }
        this.setState({
          contents:_contents,
          mode: 'read'
        })
      }.bind(this)}></UpdateContent>;
    }
    return _article;
  }
  render() {
    
    return (
      <div className="App">
        <Subject
        title={this.state.subject.title}
        subtxt={this.state.subject.subtxt}
        onChangePage={function(){
          this.setState({
            mode: 'welcome'
          });
        }.bind(this)}>
        </Subject>
        <Toc
         onChangePage={function(id){
          this.setState({
            mode: 'read',
            selected_content_id:Number(id)
          });
         }.bind(this)}
         data={this.state.contents}>
        </Toc>
        <Control onChangeMode={function(_mode){
          if (_mode === 'delete') {
            if (window.confirm('really?')) {
              var _contents = Array.from(this.state.contents)
              var i = 0;
              while(i < this.state.contents.length) {
                if (_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i,1)
                  break;
                }
                i = i + 1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('deleted!');
            }
          } else {
            this.setState({
              mode:_mode
            });
          }
          
        }.bind(this)}></Control>
        {this.getConten()}
      </div>
    )
  }
}

export default App;
