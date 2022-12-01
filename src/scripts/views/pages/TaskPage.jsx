import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DataContext from '../../contexts/dataFromDatabase';
import TaskContainer from '../components/TaskContainer';

function TaskPage() {
  const dataFromDatabase = useContext(DataContext);
  return (
    <div id="ctn-priority-matrix">
      <Container>
        <Row style={{ height: '50vh' }}>
          <Col><TaskContainer dataFromDatabase={dataFromDatabase.level_1} level={1} /></Col>
          <Col><TaskContainer dataFromDatabase={dataFromDatabase.level_2} level={2} /></Col>
        </Row>
        <Row style={{ height: '50vh' }}>
          <Col><TaskContainer dataFromDatabase={dataFromDatabase.level_3} level={3} /></Col>
          <Col><TaskContainer dataFromDatabase={dataFromDatabase.level_4} level={4} /></Col>
        </Row>
      </Container>
    </div>
  );
}
export default TaskPage;
