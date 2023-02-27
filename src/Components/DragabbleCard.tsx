import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div`
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 5px;
  background-color: ${(props) => props.theme.cardColor};
`;

interface IDraggableCardProps {
  toDo: string;
  index: number;
}

function DraggableCard({ toDo, index }: IDraggableCardProps) {
  //현재 상태 Component의 상태가 변하면 해당 컴포넌트의 모든 children은 리렌더링
  console.log(toDo, 'has been rendered');
  return (
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
  );
}
// React.memo : 부모 상태가 변경되어도 자식이 받는 prop이나 state가 변경되지 않았다면
// 해당 자식 컴포넌트는 리렌더링 하지 않음.
export default React.memo(DraggableCard);
