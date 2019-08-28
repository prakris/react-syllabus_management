import React,{ Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import './App.css';
import { data } from './Data.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { ModalC }  from './ModalC.js';
import { ModalT } from './ModalT';
import { Tables } from './Table';




class App extends Component {

 constructor(props)
 {
   super(props);
   this.state={
                std:'',
                sub:'',
                subjectData:'',
                chapModalSelect: false,
                topModalSelect:false,
                chapValue:'',
                topValue:'',
                mindex:'',
                editChap:'',
                chapindex:'',
                topindex:'',
                tcindex:''
               }
 }

 handleStd = (event) =>
 {
 this.setState({std : event.target.value})
 }

 handleSub = (event) =>
 {
   this.setState({sub : event.target.value})
 }

 handleChapter = () =>
 {
   this.setState({chapModalSelect:true})
 }

 handleTopic = (index) =>
 {
   this.setState({topModalSelect:true,mindex:index}) 
 }
 
 handleHide = () =>
 {
   this.setState({chapModalSelect:false,topModalSelect:false})
 }

 handleChapValue = (event) =>
 {
   this.setState({chapValue:event.target.value})
 }

 handleTopValue = (event) =>
 {
   this.setState({ topValue:event.target.value})
 }

 handleChapSubmit = () =>
 {    
    const { chapValue ,subjectData, chapindex, editChap } = this.state;
    if(editChap)
    {
      subjectData.chapter[chapindex].chapterName=chapValue;
      console.log("values",subjectData.chapter[chapindex].chapterName);
      this.setState({subjectData,editChap:false,chapModalSelect:false,chapValue:''})
    }
    else
    {
    subjectData.chapter.push({id:Math.random()*10,chapterName:chapValue, topic:[]});
    this.setState({subjectData,chapModalSelect:false,chapValue:''});
    }
 }

 handleTopSubmit = () =>
 {
   const { topValue , subjectData, editTop, topindex, tcindex} =this.state;
   if(editTop)
   {
     subjectData.chapter[tcindex].topic[topindex]=topValue;
     console.log('this1',subjectData.chapter[tcindex].topic[topindex]);
     this.setState({subjectData,topModalSelect:false,editTop:false,topValue:''})
   }
   else
   {
   subjectData.chapter[this.state.mindex].topic.push(topValue);
   this.setState({subjectData,topModalSelect:false,topValue:''})
   }
 }

 handleChapDelete = (index) =>
 {
   const { subjectData } = this.state;
   subjectData.chapter.splice(index,1)
   this.setState(subjectData)
 }

 handleTopDelete = (tindex,index) =>
 {
  const { subjectData } = this.state;
  subjectData.chapter[index].topic.splice(tindex,1)
  this.setState(subjectData)
 }

 handleChapEdit = (index) =>
 {
   const {  subjectData } =this.state;
   let check=subjectData.chapter[index].chapterName;
   this.setState({chapModalSelect:true,chapValue:check,
                  editChap:true,chapindex:index})
 }

handleTopEdit = (tindex,index) =>
 {
   const { subjectData } =this.state;
   let share=subjectData.chapter[index].topic[tindex]
   this.setState({topModalSelect:true,topValue:share,editTop:true,topindex:tindex,tcindex:index})
 }

 handleClick = () =>
 { 
   const {std,sub} =this.state;
   let selectStd=data.find(match => match.standard == std)
   var selectSub=selectStd.content.find(match => match.subject == sub)
   this.setState({subjectData:selectSub,std:'',sub:''})
 }

  render()
  {
    const getstd=data.find(match => match.standard == this.state.std) 
    console.log('getstd=',getstd)
   return( 
      <div>
        <h1 align="center"><b>Syllabus Management</b></h1> 
        <Form>
              <Form.Row>
                <Col sm={5}>
                  <Form.Label style={{float:"right"}} ><b>Standard</b></Form.Label>
                  <Form.Control as="select" value={this.state.std} onChange={this.handleStd}>
                    <option hidden>Select Your Standard</option>
                    <option >11</option>
                    <option >12</option>
                  </Form.Control>
                </Col>
                <Col sm={5}>
                  <Form.Label style={{float:"right"}} ><b>Subject</b></Form.Label>
                    <Form.Control as="select" value={this.state.sub} onChange={this.handleSub} >
                      <option hidden>Select Your Subject</option>
                      { getstd ?
                        getstd.content.map((value,index)=> 
                        <option key={index} >{value.subject}</option>
                         ):''
                      }
            
                    </Form.Control>
                </Col>
                <Col sm={2}  style={{alignSelf: "flex-end"}}>
                  <Button className="btn btn-primary" onClick={this.handleClick}
                      disabled={this.state.std === '' && this.state.sub === ''}>
                      {<FontAwesomeIcon icon={faCheckCircle} />}
                  </Button>
                </Col>
          </Form.Row> 
        </Form>    
        <div>
          <Tables tValue={this.state.subjectData}
                  handleChapter={this.handleChapter}
                  handleChapDelete={this.handleChapDelete}
                  handleChapEdit={this.handleChapEdit}
                  handleTopic={this.handleTopic}
                  handleTopEdit={this.handleTopEdit}
                  handleTopDelete={this.handleTopDelete}
           />
        </div>
        <div>
          <ModalC show={this.state.chapModalSelect}
                  value={this.state.chapValue}
                  handleHide={this.handleHide}
                  handleChapValue={this.handleChapValue}
                  handleChapSubmit={this.handleChapSubmit}
                  />
  
          <ModalT show={this.state.topModalSelect}
                   handleHide={this.handleHide}
                   value={this.state.topValue}
                   handleTopValue={this.handleTopValue}
                   handleTopSubmit={this.handleTopSubmit} 
                   />
       </div>              
      </div>
    );
  }
}

export default App;
