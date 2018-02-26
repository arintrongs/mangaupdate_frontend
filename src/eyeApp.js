import React, { Component } from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import './App.css';


class Head extends Component{
  render(){
    return(
      <div>
      <link href="https://fonts.googleapis.com/css?family=Chonburi|Pattaya|Roboto+Mono|Bellefair|Kanit" rel="stylesheet"/>
      <link href="path/to/lightbox.css" rel="stylesheet"/>
      </div>
      )
  }
}

const Container = styled.div`
  border-style:solid;
  border-width: 1px;
  border-radius: 5px;
  margin: 50px 150px 50px 150px;
  
  text-align: center;
  font-size: 40px;

  font-family: 'Bellefair', serif;
  #font-family: 'Roboto Mono', monospace;
`

const Topic = styled.div` 
  border-style:solid;
  border-width: 1px;
  border-radius: 5px;
  margin: 0px,0px,50px,0px;
  font-family: 'Chonburi', cursive;
  font-size: 90px;
  font-style: normal;
  padding:50px;

` 

const Show = styled.div` 
  border-style:solid;
  border-width: 1px;
  border-radius: 5px;

  




` 

const Graph = styled.div` 
  border-style:solid;
  border-width: 1px;
  border-radius: 5px;
  margin: 50px,0px,50px,0px;
  margin-left:20px;
  margin-right=0;
  float: left;
  width:60%
`

const Select = styled.div` 
  border-style:solid;
  border-width: 1px;
  border-radius: 5px;
  margin: 0px;
  text-align : left;
  padding-left: 30px;
  float:right;
  width:410px;



` 

const More = styled.div` 
  border-style:solid;
  border-width: 1px;
  border-radius: 5px;
  text-align:left;
  padding-left:0px;
  margin-top:500px;


` 

const Selector = styled.select`
  font-size:15px;
  font-family: 'Kanit', sans-serif;
  font-style:normal;

  
`

const SelectType = styled.div`
  border-style:solid;
  border-width: 1px;
  border-radius: 5px;
  float:left;


`

const Form = styled.div`
  border-style:solid;
  border-width: 1px;
  border-radius: 5px;
  margin-top:60px;


`

const Button = styled.button`
    background-color: white;
    color: black;
    border: 2px solid red;
     &:hover{
        background-color : #f6f6f7;
        cursor: pointer;
        
    }
     padding: 5px 10px 5px 10px;
     margin-bottom:20px;
     margin-left : 10px;
    font-family: 'Bellefair', serif;
    font-size:22px;
    font-size:15px;
  font-family: 'Kanit', sans-serif;
`

const Gallery = styled.div`
    margin: 5px;
    border: 1px solid #ccc;
    float: left;
    width: 180px;
`


class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      types : "",
      steps: 0,
      img : "",
      selected_types : "กระทู้ทั้งหมด",
      selected_steps : 0,
      predicted : false,
      mse : 0
    }
    this.handleTypes = this.handleTypes.bind(this)
    this.handleSteps = this.handleSteps.bind(this)
  }

  async predict(types,steps){
    let formData = new FormData();
    formData.append('types', types);
    formData.append('steps', steps);
    var response = await fetch("/predict",
    {
      method: 'post',
      body : formData
    })
    var data = await response.json()
    this.setState({
      mse : data.mse,
      img : data.path,
      predicted : true,
      types : types,
      steps : steps
    })
    console.log(data)
  }

  typesList(){
    var returnVal = [];
    var gList = ['กระทู้ทั้งหมด', 'ภาพยนตร์ต่างประเทศ', 'ภาพยนตร์แอ็คชัน','ภาพยนตร์ระทึกขวัญ','ภาพยนตร์แฟนตาซี', 'ภาพยนตร์รัก', 'ภาพยนตร์แอนิเมชัน', 'ภาพยนตร์ไซไฟ', 'ภาพยนตร์ชีวิต', 'ภาพยนตร์ตลก','ภาพยนตร์ครอบครัว'];
    for(var i=0 ;i<gList.length;i++){
        returnVal.push(<option value={gList[i]}>{gList[i]}</option>)
    }
    return returnVal
  }

  handleTypes(e){
    this.setState({
      selected_types : e.target.value
    })
  }

  handleSteps(e){
    this.setState({
      selected_steps : e.target.value
    })
  }

  render() {
    console.log(this.state)
    return (
      <Container>
        <Topic>
         ONE YEAR<br/>เฉลิมไทย
        </Topic>
        <Show>
          <Graph>
            Graph
             {
              (this.state.predicted == false)?"":<div><h1>Predicted "{this.state.types}" {this.state.steps} steps ahead</h1>
                <img src={"http://localhost:8000/"+this.state.img}/><br/> Mean Square Error : {this.state.mse}</div>
              }
          </Graph>

          <Select>
       
           <SelectType>
              Types : &nbsp;
              <Selector value={this.state.selected_types} onChange={this.handleTypes}>
                {this.typesList()}
              </Selector>
            </SelectType>
            
           
            <Form>
              Steps : &nbsp;
              <input type="text" placeholder=" Steps" onChange={this.handleSteps}/>
            <Button onClick={()=>this.predict(this.state.selected_types,this.state.selected_steps)} > Predict!</Button>
            </Form>
           
          </Select>
        </Show>

        <More>
          What's more
          <div>
           <a > 
              <img src={"img/web.JPEG"} />
            </a>
          <Gallery>

            <a > 
              <img src={"img/web.JPEG"} />
            </a>
            <div class="desc">Add a description of the image here</div>
          </Gallery>

          <Gallery>
            <a >
              <img src="E:\Only for Eye\polaroid\IMG_1598.JPG"  />
            </a>
            <div class="desc">Add a description of the image here</div>
          </Gallery>

          <Gallery>
            <a target="_blank" href="web.jpg">
              <img src="img_lights.jpg" alt="Northern Lights" width="600" height="400"/>
            </a>
            <div class="desc">Add a description of the image here</div>
          </Gallery>

          <Gallery>
            <a target="_blank" href="img_mountains.jpg">
              <img src="img_mountains.jpg" alt="Mountains" width="600" height="400"/>
            </a>
            <div class="desc">Add a description of the image here</div>
          </Gallery>
          </div>

        </More>
      </Container>

    );
  }
}

export default App;
