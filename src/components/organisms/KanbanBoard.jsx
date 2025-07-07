import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import DealCard from '@/components/molecules/DealCard';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { formatCurrency } from '@/utils/currency';

const KanbanBoard = ({ deals, stages, onDealMove, onDealClick, onAddDeal }) => {
  const [draggedDeal, setDraggedDeal] = useState(null);
  
  const handleDragStart = (start) => {
    setDraggedDeal(start.draggableId);
  };
  
  const handleDragEnd = (result) => {
    setDraggedDeal(null);
    
    if (!result.destination) return;
    
    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) return;
    
    const deal = deals.find(d => d.Id.toString() === draggableId);
    const newStage = stages.find(s => s.Id.toString() === destination.droppableId);
    
    if (deal && newStage && onDealMove) {
      onDealMove(deal, newStage);
    }
  };
  
  const getDealsByStage = (stageId) => {
    return deals.filter(deal => deal.stageId === stageId);
  };
  
  const getStageValue = (stageId) => {
    const stageDeals = getDealsByStage(stageId);
    return stageDeals.reduce((total, deal) => total + deal.value, 0);
  };
  
  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageDeals = getDealsByStage(stage.Id);
          const stageValue = getStageValue(stage.Id);
          
          return (
            <div key={stage.Id} className="flex-shrink-0 w-80">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {stage.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {stageDeals.length} deals • {formatCurrency(stageValue)}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onAddDeal(stage.Id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ApperIcon name="Plus" className="w-4 h-4" />
                </Button>
              </div>
              
              <Droppable droppableId={stage.Id.toString()}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`kanban-column p-4 space-y-3 ${
                      snapshot.isDraggingOver ? 'drag-over' : ''
                    }`}
                  >
                    {stageDeals.map((deal, index) => (
                      <Draggable
                        key={deal.Id}
                        draggableId={deal.Id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <DealCard
                              deal={deal}
                              onClick={() => onDealClick(deal)}
                              isDragging={snapshot.isDragging}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    
                    {stageDeals.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8 text-gray-500"
                      >
                        <ApperIcon name="Package" className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">No deals in this stage</p>
                      </motion.div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;