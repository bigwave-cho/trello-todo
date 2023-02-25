import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
/*
npm i react-beautiful-dnd
npm i --save-dev @types/react-beautiful-dnd
DragDropContext 
: 기본적으로 드래그 앤 드롭을 적용하고 싶은 공간
onDragEnd : 드래그가 끝나면 콜백함수 호출
<Droppable> : 드롭할 수 있는 영역
<Draggable> : 드래그 가능한 영역


droppableProps : 드래그 작동해서 움직이는 영역
dragHandle : 드래그 핸들이 작동하는 영역
one은 전체 영역 드래거블
two는 불 이모지만 가능해짐
*/
const onDragEnd = () => {};
function App() {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {(magic) => (
            <ul ref={magic.innerRef} {...magic.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(magic) => (
                  <li
                    ref={magic.innerRef}
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}
                  >
                    <span {...magic.dragHandleProps}>🔥</span>
                    one
                  </li>
                )}
              </Draggable>
              <Draggable draggableId="second" index={1}>
                {(magic) => (
                  <li ref={magic.innerRef} {...magic.draggableProps}>
                    <span {...magic.dragHandleProps}>🔥</span>
                    two
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
