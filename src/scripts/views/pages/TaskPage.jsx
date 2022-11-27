import React from 'react';
import TaskContainer from '../components/TaskContainer';

function TaskPage() {
  const dataLevel1 = [];
  const dataLevel2 = [];
  const dataLevel3 = [];
  const dataLevel4 = [];
  return (
    <div id="ctn-priority-matrix">
      <TaskContainer title="Do Now" arrData={dataLevel1} idDialog="dialog-1" idForm="form-1" />
      <TaskContainer title="Do Later" arrData={dataLevel2} idDialog="dialog-2" idForm="form-2" />
      <TaskContainer title="Delegate" arrData={dataLevel3} idDialog="dialog-3" idForm="form-3" />
      <TaskContainer title="Postpone" arrData={dataLevel4} idDialog="dialog-4" idForm="form-4" />

    </div>
  );
}
export default TaskPage;
