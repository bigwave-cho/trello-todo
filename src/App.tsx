import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';

const Wrapper = styled.div`
  max-width: 480px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  min-height: 200px;
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
`;

const Card = styled.div`
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 5px;
  background-color: ${(props) => props.theme.cardColor};
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    // console.log(args); //dnd가 전달하는 인자의 destination과 source(출발지)를 잘 보고 사용
    // 순서 바꾸기 로직
    /*
    const x = ['a', 'b', 'c', 'd', 'e', 'f'];
    const result = x.splice(0, 1);
    console.log(result) //["a"]
    x.splice(2,0,result[0]);
    console.log(x) //["b", "c", "a", "d", "e", "f"]
    */
    /*
    ## Mutation(원본 변형)
    ### non-mutation
    const name ="messi";
    name.toUpperCase(); // MESSI
    console.log(name) // messi
    */
    if (!destination) return;
    setToDos((oldToDos) => {
      const copyToDos = [...oldToDos];
      copyToDos.splice(source.index, 1);
      copyToDos.splice(destination?.index, 0, draggableId);
      return copyToDos;
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
                  // dnd에서 draggableId와 key는 일치해야 함.
                  <Draggable key={toDo} draggableId={toDo} index={index}>
                    {(magic) => (
                      <Card
                        ref={magic.innerRef}
                        {...magic.draggableProps}
                        {...magic.dragHandleProps}
                      >
                        {toDo}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
