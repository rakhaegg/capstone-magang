import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import NoteiDB from '../../data/dataNote';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    const {
      data, hak, beriHak, hapusHak,
    } = this.props;
    const {
      number, second, id, done,
    } = data;
    this.state = {
      hours: 0,
      minutes: number,
      seconds: second,
      hak,
      id,
      begin: false,
      done,
      data,
    };
    this.beriHak = beriHak;
    this.hapusHak = hapusHak;
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      begin, id, minutes, seconds,
    } = this.state;
    const { hak } = this.props;
    if (hak === '' && prevState.begin === true && begin === true) {
      if (prevProps.hak === id
        && minutes === 0 && seconds === 0) {
        this.setState(({
          begin: false,
          hak: '',
          done: true,
        }));
      } else if (prevProps.hak === id) {
        this.setState(({
          begin: false,
          hak: '',
          done: false,
        }));
      }
      if (prevProps.hak !== id) {
        this.setState(({
          begin: false,
        }));
      }
    }
    if (prevState.begin === false && hak === id
      && begin === false && hak !== '') {
      this.timer = setInterval(this.countDown, 1000);
      this.setState(({
        hak,
        begin: true,
      }));
    }
    if (prevState.begin === false && hak !== id
       && begin === false && hak !== '') {
      this.setState(({
        begin: true,
      }));
    }
  }

  // eslint-disable-next-line class-methods-use-this
  convertToSeconds = (hours, minutes, seconds) => seconds + minutes * 60 + hours * 60 * 60;

  startTimer = () => {
    const { id } = this.state;
    this.beriHak(id);
  };

  countDown = () => {
    const { hours, minutes, seconds } = this.state;
    const countSeconds = this.convertToSeconds(hours, minutes, seconds);

    if (countSeconds) {
      // seconds change
      if (seconds) {
        this.setState({ seconds: seconds - 1 });
      } else {
        this.setState({ seconds: 59 });
      }
      // minutes change
      if (countSeconds % 60 === 0 && minutes) {
        this.setState({ minutes: minutes - 1 });
      }

      // when only hours entered
      if (!minutes && hours) {
        this.setState({ minutes: 59 });
      }

      // hours change
      if (countSeconds % 3600 === 0 && hours) {
        this.setState({ hours: hours - 1 });
      }
    } else {
      this.updateData();
      console.log(this.state);
      clearInterval(this.timer);
      this.hapusHak();
    }
  };

  updateData = async () => {
    const {
      data, minutes, seconds,
    } = this.state;
    data.number = minutes;
    data.second = seconds;
    if (minutes === 0 && seconds === 0) {
      data.done = true;
    }
    await NoteiDB.putNote(data, 1);
  };

  stopTimer = () => {
    this.updateData();
    clearInterval(this.timer);
    this.hapusHak();
  };

  render() {
    const {
      minutes, seconds, begin, done, hak,
    } = this.state;
    return (
      <>

        {begin === false && done === false
          ? (
            <div className='my-2'>
              <Button onClick={this.startTimer} variant="success" className='mx-1'>
                Start
              </Button>
              <Button onClick={this.stopTimer} variant="danger" className='mx-1'>
                Stop
              </Button>
            </div>
          )
          : null}
        {begin === true && hak !== ''
          ? (
            <Button onClick={this.stopTimer}>
              Stop
            </Button>
          ) : null}

        {
          minutes === 0 && seconds === 0
            ? (
              <p>
                Selesai
              </p>
            )
            : (
              <p>
                {minutes}
                :
                {' '}
                {seconds}
              </p>
            )
        }
      </>
    );
  }
}

Timer.propTypes = {
  hak: PropTypes.string.isRequired,
  beriHak: PropTypes.func.isRequired,
  hapusHak: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};

export default Timer;
