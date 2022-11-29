import React from 'react';
import TaskContainer from '../components/TaskContainer';

function TaskPage({data, dataDate}) {
  console.log(dataDate);
  return (
    <div id="ctn-priority-matrix">
      <TaskContainer containerLevel="container-1" title="Do Now" dataDate={dataDate} arrData={data.level1} idDialog="dialog-1" idForm="form-1" />
      <TaskContainer containerLevel="container-2" title="Do Later" dataDate={dataDate} arrData={data.level2} idDialog="dialog-2" idForm="form-2" />
      <TaskContainer containerLevel="container-3" title="Delegate" dataDate={dataDate} arrData={data.level3} idDialog="dialog-3" idForm="form-3" />
      <TaskContainer containerLevel="container-4" title="Postpone" dataDate={dataDate} arrData={data.level4} idDialog="dialog-4" idForm="form-4" />

    </div>
  );
}
export default TaskPage;
