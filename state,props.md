# react -state,props



## component

props와state는 철저하게 분리해야한다.



## state(내부)

사용자는 알필요가 없는 컴퍼넌트 내부적으로 사용하는 정보

## props(외부)

컨퍼넌트를 조작할때 사용자에게 제공하는 정보





~~~~react

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Subject title="WEB" subtxt="world wide web!"></Subject>
        <Toc></Toc>
        <Content title="HTML" desc="HTML is HyperText Markup Language."></Content>
      </div>
    )
  }
}

//어떤 컴퍼넌트가 실행될때 렌더 라고 하는 이 함수보다 먼저 실행이 되면서 그 컴퍼넌트를 초기화 시켜주고 싶은 코드는 컨스트럭터 안에다가 코드를 작성한다.
~~~~

