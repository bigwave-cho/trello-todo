import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IToDo, toDoState } from '../atoms';
import DragabbleCard from './DragabbleCard';

const Wrapper = styled.div`
  width: 300px;
  min-width: 250px;
  padding: 10px 0px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;

  .modalBtn {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: x-large;
    z-index: 10;
    transition: all 0.3s ease-in;

    :hover {
      background-color: gray;
      border-radius: 50%;
    }
  }
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 10px;
  top: -100px;
  gap: 5px;
  border-radius: 5px;
  background-color: white;

  button {
    border: solid 1px lightgray;
    border-radius: 5px;
    padding: 5px 0px;

    :hover {
      cursor: pointer;
      opacity: 0.5;
    }
  }
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? '#b2bec3'
      : props.isDraggingFromThis
      ? '#dfe6e9'
      : 'transparent'};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
  max-height: 300px;
  overflow: scroll;
`;

const Form = styled.form`
  width: 100%;

  input {
    width: 100%;
  }
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
  boardTitle: string;
  index: number;
}

interface IForm {
  [key: string]: string;
}

function Board({ toDos, boardId, boardTitle, index }: IBoardProps) {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };

    setToDos((allBoards) => {
      const boardsCopy = [...allBoards];
      const boardCopy = { ...allBoards[index] };
      const newToDoArr = [...boardCopy.toDos, newToDo];
      boardCopy.toDos = newToDoArr;
      boardsCopy.splice(index, 1, boardCopy);
      return boardsCopy;
    });
    setValue('toDo', '');
  };

  const onDeleteAll = () => {
    setToDos((allBoards) => {
      const boardsCopy = [...allBoards];
      const boardCopy = { ...boardsCopy[index] };
      boardCopy.toDos = [];
      boardsCopy[index] = boardCopy;
      return boardsCopy;
    });
    setIsOpenModal(false);
  };

  const onDeleteBoard = () => {
    setToDos((allBoards) => {
      const boardsCopy = [...allBoards];
      boardsCopy.splice(index, 1);
      return boardsCopy;
    });
    setIsOpenModal(false);
  };

  const onModifyBoard = () => {
    const newTitle = window.prompt('보드의 새 이름을 입력하세요.');
    if (newTitle === undefined) return;
    if (newTitle) {
      console.log(newTitle);
      setToDos((allBoards) => {
        const boardsCopy = [...allBoards];
        const boardCopy = { ...boardsCopy[index] };
        boardCopy.title = newTitle;
        boardsCopy.splice(index, 1, boardCopy);
        return boardsCopy;
      });
    }
    setIsOpenModal(false);
  };

  const onOpenModal = () => {
    setIsOpenModal((prev) => !prev);
  };
  return (
    <Draggable index={index} key={boardId} draggableId={`board-${boardId}`}>
      {(magic) => {
        return (
          <Wrapper ref={magic.innerRef} {...magic.draggableProps}>
            <Title {...magic.dragHandleProps}>
              {boardTitle}
              <div className="modalBtn" onClick={onOpenModal}>
                ...
              </div>
              {isOpenModal && (
                <Modal>
                  <button onClick={onDeleteAll}>전삭</button>
                  <button onClick={onDeleteBoard}>보드삭제</button>
                  <button onClick={onModifyBoard}>보드수정</button>
                </Modal>
              )}
            </Title>
            <Form onSubmit={handleSubmit(onValid)}>
              <input
                {...register('toDo', { required: true })}
                type={'text'}
                placeholder={`Add task on ${boardTitle}`}
              />
            </Form>
            <Droppable droppableId={`todos-${boardId}`}>
              {(magic, snapshot) => {
                return (
                  <Area
                    isDraggingOver={snapshot.isDraggingOver}
                    isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                    ref={magic.innerRef}
                    {...magic.droppableProps}
                  >
                    {toDos.map((toDo, index) => (
                      <DragabbleCard
                        boardId={boardId}
                        key={toDo.id}
                        index={index}
                        toDoId={toDo.id}
                        toDoText={toDo.text}
                      />
                    ))}
                    {magic.placeholder}
                  </Area>
                );
              }}
            </Droppable>
          </Wrapper>
        );
      }}
    </Draggable>
  );
}
export default React.memo(Board);
