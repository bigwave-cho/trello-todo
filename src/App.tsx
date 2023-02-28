import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import Board from './Components/Board';

const Wrapper = styled.div`
  max-width: 1280px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

interface ICreateBoardProps {
  isBoardOpen: boolean;
}

const CreateBoard = styled.div<ICreateBoardProps>`
  display: flex;
  background-color: #dadfe9;
  padding: 15px 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  color: black;
  font-weight: 600;
  transition: all 0.3s ease-in;

  &:hover {
    opacity: ${(props) => (props.isBoardOpen ? 1 : 0.8)};
    cursor: pointer;
  }

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
    cursor: pointer;
  }
`;

interface IBoardsProps {
  isDraggingFromThis: boolean;
}

const Boards = styled.div<IBoardsProps>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  transition: all 0.3s ease-in;
  background-color: ${(props) =>
    props.isDraggingFromThis ? 'rgba(0, 0, 0, 0.3)' : 'transparent'};
`;

function App() {
  const [boards, setBoards] = useRecoilState(toDoState);
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm<IBoardForm>();

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;

    if (source.droppableId === 'boards') {
      if (destination.index === source.index) return;
      if (destination.index !== source.index) {
        setBoards((prev) => {
          const boardsCopy = [...prev];
          const taskBoard = boardsCopy[+source.index];
          boardsCopy.splice(+source.index, 1);
          boardsCopy.splice(+destination.index, 0, taskBoard);
          return boardsCopy;
        });
      }
    }
    if (destination?.droppableId === source.droppableId) {
      setBoards((allBoards) => {
        const boardsCopy = [...allBoards];
        const boardIndex = boardsCopy.findIndex(
          (board) => board.id + '' === source.droppableId.split('-')[1]
        );
        const boardCopy = { ...boardsCopy[boardIndex] };
        const listCopy = boardCopy?.toDos?.length ? [...boardCopy.toDos] : [];

        if (boardCopy?.toDos?.length) {
          const targetToDo = boardCopy.toDos[source.index];

          listCopy.splice(source.index, 1);
          listCopy.splice(destination.index, 0, targetToDo);

          boardCopy.toDos = listCopy;
          boardsCopy.splice(boardIndex, 1, boardCopy);
        }

        return boardsCopy;
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      setBoards((allBoards) => {
        const allBoardsCopy = [...allBoards];
        const sourceBoardIndex = allBoardsCopy.findIndex(
          (board) => board.id + '' === source.droppableId.split('-')[1]
        );
        const destiBoardIndex = allBoardsCopy.findIndex(
          (board) => board.id + '' === destination.droppableId.split('-')[1]
        );

        const sourceBoardCopy = { ...allBoardsCopy[sourceBoardIndex] };
        const destinationBoardCopy = { ...allBoardsCopy[destiBoardIndex] };
        const sourceToDosCopy = [...sourceBoardCopy.toDos];
        const destinationToDosCopy = [...destinationBoardCopy.toDos];

        const targetToDo = sourceBoardCopy.toDos[source.index];

        sourceToDosCopy.splice(source.index, 1);
        destinationToDosCopy.splice(destination.index, 0, targetToDo);

        sourceBoardCopy.toDos = sourceToDosCopy;
        destinationBoardCopy.toDos = destinationToDosCopy;

        allBoardsCopy.splice(sourceBoardIndex, 1, sourceBoardCopy);
        allBoardsCopy.splice(destiBoardIndex, 1, destinationBoardCopy);

        return allBoardsCopy;
      });
    }
  };

  useEffect(() => {
    localStorage.setItem('toDos', JSON.stringify(boards));
  }, [boards]);

  const onClick = () => {
    setIsBoardOpen((prev) => !prev);
  };

  interface IBoardForm {
    board: string;
  }

  const onValid = ({ board }: IBoardForm) => {
    const newBoard = { title: board, id: Date.now(), toDos: [] };
    setBoards((prev) => [...prev, newBoard]);
    setValue('board', '');
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <div>
          {!isBoardOpen ? (
            <CreateBoard isBoardOpen={isBoardOpen} onClick={onClick}>
              보드 추가
            </CreateBoard>
          ) : (
            <CreateBoard isBoardOpen={isBoardOpen}>
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
        <Droppable droppableId={`boards`} direction="horizontal" type="BOARDS">
          {(provided, snapshot) => (
            <Boards
              isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {boards.map((board, index) => {
                return (
                  <Board
                    key={index}
                    index={index}
                    boardTitle={board.title}
                    boardId={board.id + ''}
                    toDos={board.toDos}
                  />
                );
              })}
              {provided.placeholder}
            </Boards>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
