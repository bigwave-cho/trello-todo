import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../atoms';

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.isDragging ? '#74b9ff' : props.theme.cardColor};

  box-shadow: ${(props) =>
    props.isDragging ? '0px 2px 5px rgba(0,0,0,0.05)' : 'none'};

  transition: background-color 0.3s ease-in-out;
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DraggableCard({
  toDoId,
  index,
  toDoText,
  boardId,
}: IDraggableCardProps) {
  const setBoards = useSetRecoilState(toDoState);

  const onDelete = () => {
    setBoards((allboards) => {
      const boardsCopy = [...allboards];
      const boardIndex = boardsCopy.findIndex((board) => board.id === +boardId);
      const boardCopy = { ...boardsCopy[boardIndex] };
      const toDos = [...boardCopy.toDos];
      toDos.splice(index, 1);
      boardCopy.toDos = toDos;
      boardsCopy.splice(boardIndex, 1, boardCopy);

      return boardsCopy;
    });
  };

  return (
    <Draggable draggableId={`todo-${toDoId}`} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
          <button onClick={onDelete}>X</button>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
