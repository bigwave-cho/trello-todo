import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import Board from './Components/Board';

const Wrapper = styled.div`
  max-width: 680px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  /* background-color: black; */
`;

const CreateBoard = styled.button`
  display: flex;
  background-color: bisque;
  padding: 15px 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  color: black;

  input {
    width: 300px;
    height: 40px;
    padding-left: 10px;
    border-radius: 10px;
    border: none;
  }
  button {
    height: 40px;
    width: 60px;
    margin-left: 5px;
    background-color: white;
    border: none;
    border-radius: 10px;
  }
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    // if (destination?.droppableId === source.droppableId) {
    //   setToDos((allBoards) => {
    //     const boardCopy = [...allBoards[source.droppableId]];
    //     const taskObj = boardCopy[source.index];
    //     boardCopy.splice(source.index, 1);
    //     boardCopy.splice(destination?.index, 0, taskObj);
    //     return {
    //       ...allBoards,
    //       [source.droppableId]: boardCopy,
    //     };
    //   });
    // }
    // if (destination?.droppableId !== source.droppableId) {
    //   setToDos((allBoards) => {
    //     const sourceBoard = [...allBoards[source.droppableId]];
    //     const taskObj = sourceBoard[source.index];
    //     const destinationBoard = [...allBoards[destination?.droppableId]];
    //     sourceBoard.splice(source.index, 1);
    //     destinationBoard.splice(destination!.index, 0, taskObj);
    //     return {
    //       ...allBoards,
    //       [source.droppableId]: sourceBoard,
    //       [destination?.droppableId]: destinationBoard,
    //     };
    //   });
  };

  useEffect(() => {
    // localStorage.setItem('toDos', JSON.stringify(toDos));
  }, []);
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm<IBoardForm>();
  const [board, setBoard] = useRecoilState(toDoState);
  const onClick = () => {
    setIsBoardOpen((prev) => !prev);
  };

  interface IBoardForm {
    board: string;
  }

  const onValid = ({ board }: IBoardForm) => {
    const newBoard = { title: board, id: Date.now(), toDos: [] };
    setBoard((prev) => [...prev, newBoard]);
    setValue('board', '');
  };
  console.log(board);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <div>
          {!isBoardOpen ? (
            <CreateBoard onClick={onClick}>보드 추가</CreateBoard>
          ) : (
            <CreateBoard>
              <form onSubmit={handleSubmit(onValid)}>
                <input
                  {...register('board', { required: true })}
                  type="text"
                  placeholder="이름을 입력후 Enter 누르세요"
                />
              </form>
              <button onClick={onClick}>취소</button>
            </CreateBoard>
          )}
        </div>
        <Droppable droppableId={`boards`}>
          {(provided) => (
            <Boards ref={provided.innerRef} {...provided.droppableProps}>
              {toDos.map((toDo) => {
                return (
                  <Board
                    boardId={toDo.title}
                    key={toDo.title}
                    toDos={toDo.toDos}
                  />
                );
              })}
            </Boards>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
