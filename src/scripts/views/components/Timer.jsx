import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    const {
      dataMinute, hak, beriHak, id, hapusHak,
    } = this.props;
    this.state = {
      hours: 0,
      minutes: id === '5886e52e-b08a-4e2d-902a-8038d77820b7' ? 0 : dataMinute,
      seconds: 10,
      hak,
      id,
      begin: false,
      done: false,
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
      clearInterval(this.timer);
      this.hapusHak();
    }
  };

  stopTimer = () => {
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
            <div>
              <Button onClick={this.startTimer}>
                start
              </Button>
              <Button onClick={this.stopTimer}>
                stop
              </Button>
            </div>
          )
          : null}
        {begin === true && hak !== ''
          ? (
            <Button onClick={this.stopTimer}>
              stop
            </Button>
          ) : null}

        {
          minutes === 0 && seconds === 0
            ? (
              <h1>
                Selesai
              </h1>
            )
            : (
              <h1>
                {minutes}
                :
                {' '}
                {seconds}
              </h1>
            )
        }
      </>
    );
  }
}

Timer.propTypes = {
  dataMinute: PropTypes.number.isRequired,
  hak: PropTypes.string.isRequired,
  beriHak: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  hapusHak: PropTypes.func.isRequired,
};

export default Timer;
