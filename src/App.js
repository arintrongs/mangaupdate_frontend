import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width:100%;
  display : grid;
  grid-template-columns : 800px 800px;
  grid-gap: 20px 20px;
  min-width : 0;
  min-height : 0;
  font-family: 'Roboto', sans-serif;

`
const Header = styled.div`
  margin-top:60px;
  margin-bottom : 40px;
  font-size : 80px;
  grid-column :1/span 2;
  grid-row : 1;
  text-align : center;
  font-family: 'Pacifico', cursive;
`

const Detail = styled.div`
  grid-column : 1;
  grid-row : 2;
  background : rgba(166,166,166,0.5);
  overflow: hidden;
`

const Panel = styled.div`
  grid-column : 1;
  grid-row : 2;
  background : rgba(166,166,166,0.5);
  overflow: hidden;
  height : 230px;
  padding :15px;
  button{
    display:inline-block;
    float : right;
  }
  
`

const Graph = styled.div`
  position : relative;
  grid-column : 2;
  grid-row : 2/ span 2;
  background : rgba(166,166,166,0.5);
  text-align : center;
  overflow: hidden;
  padding-bottom : 15px;  
  img{
    position :relative;
    width : 750px;
  }
`

const Selector = styled.select`
    -webkit-appearance: none;
    -webkit-border-radius: 0px;
    font-size:14px;
    padding : 8px;
    width : 300px;
    color :#4b4f5d;
`;

const Form = styled.div`
    font-family: 'Roboto', sans-serif;
    padding : 15px;
    input{
        height : 20px;
        width : 300px;
        font-size : 20px;
        border : 0.5px;
        border-style : solid;
        border-color : #dedfe0;
        border-radius : 2px;
        margin-top : 15px;
        -webkit-appearance: none;
        -webkit-border-radius: 0px;
        font-size:14px;
        padding : 8px;
        width : 200px;
        color :#4b4f5d;

    }
`;

const Button = styled.button`
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 2px;
    color: #757575;
    font-size: 14px;
    background: #ffffff;
    padding: 10px 20px 10px 20px;
    text-decoration: none;
    &:hover{
        background-color : #f6f6f7;
        cursor: pointer;
        
    }
`;

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      genres : "",
      steps: 0,
      img : "",
      selected_genres : "Action",
      selected_steps : 0,
      predicted : false,
      mse : 0
    }
    this.handleGenres = this.handleGenres.bind(this)
    this.handleSteps = this.handleSteps.bind(this)
  }

  async predict(genres,steps){
    let formData = new FormData();
    formData.append('genres', genres);
    formData.append('steps', steps);
    var response = await fetch("/5931075421/predict",
    {
      method: 'post',
      body : formData
    })
    var data = await response.json()
    this.setState({
      mse : data.mse,
      img : data.path,
      predicted : true,
      genres : genres,
      steps : steps
    })
    console.log(data)
  }

  genresList(){
    var returnVal = [];
    var gList = ['Action','Adult','Adventure','Comedy','Doujinshi','Drama','Ecchi','Fantasy','Gender Bender','Harem','Hentai','Historical','Horror','Josei','Lolicon','Martial Arts','Mature','Mecha','Mystery','Psychological','Romance','School Life','Sci-fi','Seinen','Shotacon','Shoujo','Shoujo Ai','Shounen','Shounen Ai','Slice of Life','Smut','Sports','Supernatural','Tragedy','Yaoi','Yuri'];
    for(var i=0 ;i<gList.length;i++){
        returnVal.push(<option value={gList[i]}>{gList[i]}</option>)
    }
    return returnVal
  }

  handleGenres(e){
    this.setState({
      selected_genres : e.target.value
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
        <Header>Whats Genres?</Header>
        {/* <Detail /> */}
        <Panel>
          <h2>Select Genres and Steps that you want!</h2>
          <div>
          Genres : &nbsp;
          <Selector value={this.state.selected_genres} onChange={this.handleGenres}>
            {this.genresList()}
          </Selector>
          </div>
          <Form>
            Steps : &nbsp;
            <input type="text" placeholder=" Steps" onChange={this.handleSteps}/>
          </Form>
          <Button onClick={()=>this.predict(this.state.selected_genres,this.state.selected_steps)} > Predict!</Button>
        </Panel>
        <Graph>
          {
            (this.state.predicted == false)?"Waiting..":<div><h1>Predicted "{this.state.genres}" {this.state.steps} steps ahead</h1>
              <img src={"http://159.89.197.13/"+this.state.img}/><br/> Mean Square Error : {this.state.mse}</div>
          }
          
        </Graph>
      </Container>
    );
  }
}

export default App;
