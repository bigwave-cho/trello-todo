import React from 'react';
import { DraggableProvided, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IToDo, toDoState } from '../atoms';
import DragabbleCard from './DragabbleCard';

const Wrapper = styled.div`
  width: 300px;
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
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;

  div {
    position: absolute;
    right: 10px;
  }
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? '#dfe6e9'
      : props.isDraggingFromThis
      ? '#b2bec3'
      : 'transparent'};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
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
  parentMagic: DraggableProvided;
  index: number;
}

interface IForm {
  [key: string]: string;
}

function Board({
  toDos,
  boardId,
  boardTitle,
  parentMagic,
  index,
}: IBoardProps) {
  const { register, handleSubmit, setValue } = useForm<IForm>();

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
  };

  const onDeleteBoard = () => {
    setToDos((allBoards) => {
      const boardsCopy = [...allBoards];
      boardsCopy.splice(index, 1);
      return boardsCopy;
    });
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
  };

  return (
    <Wrapper ref={parentMagic.innerRef} {...parentMagic.draggableProps}>
      <Title {...parentMagic.dragHandleProps}>
        {boardTitle}
        <div>
          <button onClick={onDeleteAll}>전삭</button>
          <button onClick={onDeleteBoard}>보드삭제</button>
          <button onClick={onModifyBoard}>보드수정</button>
        </div>
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
}
export default React.memo(Board);
