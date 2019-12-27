/**
 * Main scoreboard elenent
 * Keyboard detection is attached to this object.
 */
var scoreboard = null;

//alias for creating React elements
const rec = React.createElement;

//can hold snapshots of the states
const Records = [];

/**
 * Settings
 */
const Settings = {
  MinScore: -5,
  MaxScore: 99,

  AllezMinute: 3, //main clock minutes
  AllezSecond: 0, //main clock seconds

  BreakSecond: 30, //break clock max seconds
  MaxDoubles: 3, //max doubles per fencer
  BoutLabels: [
    "Start",
    "Stop"
  ]
};

//keycodes - most qwerty keys mapped
const keycodes = { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, PAUSEBREAK: 19, CAPSLOCK: 20, ESCAPE: 27, PAGEUP: 33, PAGEDOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, INSERT: 45, DELETE: 46, ZERO: 48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57, A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90, LWINDOW: 91, RWINDOW: 92, SELECT: 93, NUM0: 96, NUM1: 97, NUM2: 98, NUM3: 99, NUM4: 100, NUM5: 101, NUM6: 102, NUM7: 103, NUM8: 104, NUM9: 105, MULTIPLY: 106, ADD: 107, SUBTRACT: 109, DECIMAL: 110, DIVIDE: 111, F1: 112, F2: 113, F3: 114, F4: 115, F5: 116, F6: 117, F7: 118, F8: 119, F9: 120, F10: 121, F11: 122, F12: 123, NUMLOCK: 144, SCROLLLOCK: 145, SEMICOLON: 186, EQUAL: 187, COMMA: 188, DASH: 189, PERIOD: 190, FORWARDSLASH: 191, GRAVEACCENT: 192, BACKSLASH: 220, OPENBRACKET: 219, CLOSEBRACKET: 221, SINGLEQUOTE: 222, SPACEBAR: 32 };

/**
 * Main component
 */
class Scoreboard extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    //initial state
    this.state = this._getInitState();

    //references
    this.AllezClock = React.createRef();
    this.BreakClock = React.createRef();
    this.FencerLeft = React.createRef();
    this.FencerRight = React.createRef();

    //method bindings
    this.ToggleMainClock = this.ToggleMainClock.bind(this);
    this.ToggleBreakClock = this.ToggleBreakClock.bind(this);
    this.reset = this.reset.bind(this);

    //event bindings
    this._onClickMainClock = this._onClickMainClock.bind(this);
    this._onClickBreakClock = this._onClickBreakClock.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    //callbacks
    this._onSaveConfig = this._onSaveConfig.bind(this);
    this._onCloseConfig = this._onCloseConfig.bind(this);
  }

  /**
   * Gets an object that represents the initial state.
   * Used to reset the board.
   */
  _getInitState() {
    return {
      BoutIndex: 0,
      MainClockState: Clock.STATUS_READY,
      BreakClockState: Clock.STATUS_READY,
      FencerLeftName: "LEFT",
      FencerLeftColor: "#990000",
      FencerRightName: "RIGHT",
      FencerRightColor: "#006699",
      ConfigShown: false
    };
  }

  /**
   * Toggles the main clock
   */
  ToggleMainClock() {
    var index = this.state.BoutIndex + 1;
    var cstatus = this.state.MainClockState;
    if (index >= Settings.BoutLabels.length)
      index = 0;

    switch (cstatus) {
      //start clock
      case Clock.STATUS_STOPPED:
      case Clock.STATUS_READY:
        cstatus = Clock.STATUS_RUNNING;
        break;

      //stop clock
      case Clock.STATUS_RUNNING:
        cstatus = Clock.STATUS_STOPPED;
        break;
    }

    this.setState((state) => {
      return { BoutIndex: index, MainClockState: cstatus }
    });
  }

  /**
   * Toggles the break clock
   */
  ToggleBreakClock() {
    var status = this.state.BreakClockState;
    switch (status) {
      //run
      case Clock.STATUS_READY:
        status = Clock.STATUS_RUNNING;
        break;

      default:
        status = Clock.STATUS_READY;
        break;
    }

    this.setState((state) => {
      return { BreakClockState: status };
    });
  }

  /**
   * Resets the component
   */
  reset() {
    this.setState(this._getInitState(), () => {
      this.FencerLeft.current.reset();
      this.FencerRight.current.reset();
    });
  }

  /**
   * Triggered when the user presses a keyboard key.
   * @param {KeyEvent} ev
   */
  onKeyUp(ev) {
    var name = ev.target.tagName.toLowerCase();

    //retain normal behavior if focused on an input field
    switch (name) {
      case "input":
      case "textarea":
      case "select":
        ev.stopPropagation();
        return;
        break;
    }

    ev.stopPropagation();

    //put all known keycodes here, to prevent default behavior
    switch (ev.keyCode) {
      case keycodes.SPACEBAR:
      case keycodes.ENTER:
      case keycodes.UP:
      case keycodes.DOWN:
      case keycodes.LEFT:
      case keycodes.PERIOD:
      case keycodes.RIGHT:
      case keycodes.FORWARDSLASH:
      case keycodes.BACKSLASH:
      case keycodes.OPENBRACKET:
      case keycodes.CLOSEBRACKET:
      case keycodes.SEMICOLON:
      case keycodes.SINGLEQUOTE:
      case keycodes.L:
      case keycodes.ADD:
      case keycodes.SUBTRACT:
      case keycodes.MULTIPLY:
        ev.preventDefault();
        break;
    }

    //place key-up processes here
    switch (ev.keyCode) {
      //Start / Stop main clock
      case keycodes.SPACEBAR:
      case keycodes.ENTER:
        this.ToggleMainClock();
        break;

      //reset clock only or increase time by 1 second shift+up
      case keycodes.UP:
        if (ev.ctrlKey) {
          this.setState((state) => {
            return { MainClockState: Clock.STATUS_READY };
          });
        } else if (ev.shiftKey) {
          this.AllezClock.current.add(0, 0, 1);
        }
        break;

      //increase game clock by 1 second
      case keycodes.ADD:
        this.AllezClock.current.add(0, 0, 1);
        break;

      //decrease game clock by 1 second
      case keycodes.SUBTRACT:
        this.AllezClock.current.subtract(0, 0, 1);
        break;

      //ctrl+shift+down = set clock to 1 second
      //ctrl+down = reset
      case keycodes.DOWN:
        if (ev.ctrlKey && ev.shiftKey) {
          this.setState((state) => {
            return { MainClockState: Clock.STATUS_READY };
          }, () => {
            this.AllezClock.current.set(0, 0, 1);
          });
        } else if (ev.shiftKey) {
          this.AllezClock.current.subtract(0, 0, 1);
        }
        break;

      //left fencer score
      case keycodes.LEFT:
      case keycodes.PERIOD:
        if (ev.ctrlKey)
          this.FencerLeft.current.resetScore();
        else if (ev.shiftKey)
          this.FencerLeft.current.decreaseScore();
        else
          this.FencerLeft.current.increaseScore();
        break;
      case keycodes.NUM4:
        this.FencerLeft.current.increaseScore();
        break;
      case keycodes.NUM1:
        this.FencerLeft.current.decreaseScore();
        break;

      //left fencer doubles
      case keycodes.SEMICOLON:
        if (ev.ctrlKey)
          this.FencerLeft.current.resetDoubles();
        else if (ev.shiftKey)
          this.FencerLeft.current.decreaseDoubles();
        else
          this.FencerLeft.current.increaseDoubles();
        break;
      case keycodes.NUM7:
        this.FencerLeft.current.increaseDoubles();
        break;

      //left fencer cards
      case keycodes.OPENBRACKET:
        if (ev.ctrlKey)
          this.FencerLeft.current.resetCards();
        else if (ev.shiftKey)
          this.FencerLeft.current.hideCard();
        else
          this.FencerLeft.current.showCard();
        break;
      case keycodes.NUM8:
        this.FencerLeft.current.showCard();
        break;

      //right fencer score
      case keycodes.RIGHT:
      case keycodes.FORWARDSLASH:
        if (ev.ctrlKey)
          this.FencerRight.current.resetScore();
        else if (ev.shiftKey)
          this.FencerRight.current.decreaseScore();
        else
          this.FencerRight.current.increaseScore();
        break;
      case keycodes.NUM6:
        this.FencerRight.current.increaseScore();
        break;
      case keycodes.NUM3:
        this.FencerRight.current.decreaseScore();
        break;

      //right fencer doubles
      case keycodes.SINGLEQUOTE:
        if (ev.ctrlKey)
          this.FencerRight.current.resetDoubles();
        else if (ev.shiftKey)
          this.FencerRight.current.decreaseDoubles();
        else
          this.FencerRight.current.increaseDoubles();
        break;
      case keycodes.NUM9:
        this.FencerRight.current.increaseDoubles();
        break;

      //right fencer cards
      case keycodes.CLOSEBRACKET:
        if (ev.ctrlKey)
          this.FencerRight.current.resetCards();
        else if (ev.shiftKey)
          this.FencerRight.current.hideCard();
        else
          this.FencerRight.current.showCard();
        break;
      case keycodes.NUM2:
        this.FencerRight.current.showCard();
        break;

      //reset scoreboard
      case keycodes.L:
        if (ev.ctrlKey && ev.shiftKey) {
          this.reset();
        }
        break;

      //reset scoreboard
      //case keycodes.DIVIDE :
      //this.reset();
      //break;

      //Toggle Break/Timeout Clock
      case keycodes.BACKSLASH:
      case keycodes.MULTIPLY:
        this.ToggleBreakClock();
        break;

      default:

        break;
    }
  }

  /**
   * Triggered when the user clicks the main clock.
   * @param {MouseEvent} ev
   */
  _onClickMainClock(ev) {
    ev.stopPropagation();
    ev.preventDefault();

    if (ev.ctrlKey) {
      var init = this._getInitState();
      this.setState((state) => {
        return {
          MainClockHour: init.MainClockHour,
          MainClockMinute: init.MainClockMinute,
          MainClockSecond: init.MainClockSecond,
          MainClockState: init.MainClockState
        };
      })
    } else {
      this.ToggleMainClock();
    }
  }

  /**
   * Triggered when the user clicks the break clock.
   * @param {MouseEvent} ev
   */
  _onClickBreakClock(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    this.ToggleBreakClock();
  }

  /**
   * Triggered when the config popup is saved.
   * @param {Object} values
   */
  _onSaveConfig(values) {
    this.setState((state) => {
      return { ConfigShow: false };
    });
    this.FencerLeft.current.setState((state) => {
      return {
        name: values.FencerLeftName,
        color: values.FencerLeftColor
      }
    });
    this.FencerRight.current.setState((state) => {
      return {
        name: values.FencerRightName,
        color: values.FencerRightColor
      }
    });
  }

  /**
   * Triggered when cancelling the config popup.
   */
  _onCloseConfig() {
    this.setState((state) => {
      return { ConfigShown: false };
    });
  }

  /**
   * Renders the component
   */
  render() {
    return (
      rec('div', {
        className: "scoreboard",
        onContextMenu: (ev) => {
          if (!ev.shiftKey)
            ev.preventDefault();
        }
      }, [
        //Main Clock
        rec(Clock, {
          className: "allez-clock",
          ref: this.AllezClock,
          minutes: Settings.AllezMinute,
          status: this.state.MainClockState,
          onClick: this._onClickMainClock,
          onContextMenu: this._onContextMenuMainClock
        }),

        //Break Clock
        rec(Clock, {
          className: "break-clock",
          ref: this.BreakClock,
          seconds: Settings.BreakSecond,
          type: 'W',
          status: this.state.BreakClockState,
          onClick: this._onClickBreakClock
        }),

        //Left Fencer
        rec(Fencer, {
          side: "left",
          ref: this.FencerLeft,
          name: "LEFT",
          color: "#990000"
        }),

        //Right Fencer
        rec(Fencer, {
          side: "right",
          ref: this.FencerRight,
          name: "RIGHT",
          color: "#006699"
        }),

        //Main Button
        rec('button', {
          onClick: this.ToggleMainClock,
          className: "main-control-button",
          title: "Start/Stop Clock"
        }, Settings.BoutLabels[this.state.BoutIndex]),

        //Break Clock Button
        rec('img', {
          className: "break-clock-button icon",
          onClick: this.ToggleBreakClock,
          src: "icons/stopwatch.png",
          title: "Break Clock"
        }),

        //Config icon
        rec('img', {
          src: "icons/settings.png",
          className: "icon config-icon",
          title: "Settings",
          onClick: () => {
            this.setState((state) => {
              return { ConfigShown: !state.ConfigShown }
            });
          }
        }),

        //Reset icon
        rec('img', {
          src: "icons/reset.png",
          className: "icon reset-icon",
          title: "Reset All",
          onClick: this.reset
        }),

        //Configuration
        rec(ScoreboardConfig, {
          onSubmit: this._onSaveConfig,
          onCancel: this._onCloseConfig,
          visible: this.state.ConfigShown,
          values: this.state
        })
      ])
    );
  }
}

/**
 * Base clock component
 */
class Clock extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      hours: (this.props.hours) ? this.props.hours : 0,
      minutes: (this.props.minutes) ? this.props.minutes : 0,
      seconds: (this.props.seconds) ? this.props.seconds : 0,
      tenths: 0,
      showTenths: (this.props.showTenths) ? this.props.showTenths : false,
      type: (this.props.type) ? this.props.type : 'C'
    };

    this.InitTime = {
      hour: this.state.hour,
      minute: this.state.minute,
      second: this.state.second
    }

    //timer reference
    this.Timer = null;

    //bindings
    this._onContextMenu = this._onContextMenu.bind(this);
  }

  /**
   * Starts the clock
   */
  start() {
    this.reset();
    this.tick();
  }

  /**
   * Stops the clock.
   * If a stopwatch, the clock is reset.
   */
  stop() {
    this.clear();
    if (this.type === 'W')
      this.reset();
  }

  /**
   * Resets the clock
   */
  reset() {
    this.clear();
    this.setState((state) => {
      return {
        hours: (this.props.hours) ? this.props.hours : 0,
        minutes: (this.props.minutes) ? this.props.minutes : 0,
        seconds: (this.props.seconds) ? this.props.seconds : 0,
        tenths: 0
      };
    });
  }

  /**
   * Adds the given amount of time to the clock
   * @param {Number} h hours
   * @param {Number} m minutes
   * @param {Number} s seconds
   */
  add(h, m, s) {
    //cannot change when clock is running
    if (this.state.status == 1)
      return;

    var hours = this.state.hours + h;
    var minutes = this.state.minutes + m;
    var seconds = this.state.seconds + s;

    if (seconds > 59) {
      seconds = 0;
      minutes++;
    }

    if (minutes > 59) {
      minutes = 0;
      hours++;
    }

    if (hours > 23)
      hours = 23;

    this.setState((state) => {
      return {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        tenths: 0
      };
    });
  }

  /**
   * Subtracts the given time from the clock.
   * @param {Number} h Hours
   * @param {Number} m Minutes
   * @param {Number} s Seconds
   */
  subtract(h, m, s) {
    //cannot change when clock is running
    if (this.state.status == 1)
      return;

    var hours = this.state.hours - h;
    var minutes = this.state.minutes - m;
    var seconds = this.state.seconds - s;

    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }

    if (minutes < 0) {
      seconds = 0;
      minutes = 59;
      hours--;
    }

    if (hours < 0) {
      hours = 0;
    }

    this.setState((state) => {
      return {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        tenths: 0
      };
    });
  }

  /**
   * Sets the clock to the given time.
   * @param {Number} h Hour
   * @param {Number} m Minute
   * @param {Number} s Second
   */
  set(h, m, s) {
    this.setState((state) => {
      return {
        hours: h,
        minutes: m,
        seconds: s,
        tenths: 0
      };
    });
  }

  /**
   * Ticks the clock.
   * This function runs every 1/10th of a second so the clock operates on tenths,
   * even if the tenths aren't shown. Play clocks need to start at 0 tenths, and
   * once they start, the first 1/10th of a second is removed... so:
   *
   * Start 60 seconds
   * Start
   * Subtract 1/10th
   * Now, 59.9 seconds
   */
  tick() {
    this.clear();
    var hours = this.state.hours;
    var minutes = this.state.minutes;
    var seconds = this.state.seconds;
    var tenths = this.state.tenths;

    tenths--;
    if (tenths < 0) {
      tenths = 9;
      seconds--;
      if (seconds < 0) {
        seconds = 59;
        minutes--;
        if (minutes < 0) {
          hours--;
          minutes = 59;
          if (hours < 0) {
            hours = 0;
            minutes = 0;
            seconds = 0;
            tenths = 0;
          }
        }
      }

      this.setState({
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        tenths: tenths
      });

      //tick in 1/10th of a second
      if (!this.done(hours, minutes, seconds, tenths))
        this.Timer = setTimeout(this.tick.bind(this), 100);

    } else {
      this.setState({
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        tenths: tenths
      });

      //tick in 1/10th of a second
      if (!this.done(hours, minutes, seconds, tenths))
        this.Timer = setTimeout(this.tick.bind(this), 100);
    }
  }

  /**
   * Used to check if the clock is done.
   * @param {Number} h Hours
   * @param {Number} m Minutes
   * @param {Number} s Seconds
   * @param {Number} t Tenths
   */
  done(h, m, s, t) {
    if (h <= 0 && m <= 0 && s <= 0 && t <= 0)
      return true;
    return false;
  }

  /**
   * Clears the timer that tracks the tick/tock of the clock.
   */
  clear() {
    try {
      clearTimeout(this.Timer);
    } catch (er) {

    }
  }

  /**
   * Gets the text to display.
   */
  getText() {
    var parts = [];
    if (this.state.hours > 0)
      parts.push(this.pad(this.state.hours));

    if (this.state.type === 'C') {

      //only pad the minute if there is one or more hours
      if (this.state.hours > 0)
        parts.push(this.pad(this.state.minutes));
      else
        parts.push(this.state.minutes.toString());
    }

    parts.push(this.pad(this.state.seconds));

    var str = parts.join(':');
    if (this.state.showTenths)
      str += "." + this.state.tenths;
    return str;
  }

  /**
   * Left-pads the number for proper clock display
   * @param {Number} s The number to pad
   */
  pad(s) {
    if (s.padStart)
      return s.toString().padStart(2, '0');
    else {
      return ((s < 10) ? '0' : '') + s.toString();
    }
  }

  /**
   * Triggered with a context-menu (right-click) occurs on the clock.
   * @param {MouseEvent} ev
   */
  _onContextMenu(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.setState((state) => {
      return { showTenths: !this.state.showTenths }
    });
  }

  /**
   * Triggered when the properties have changed for the component.
   *
   * Check if the status of the clock has changed.
   *
   * @param {Object} prevProps Previous properties
   */
  componentDidUpdate(prevProps) {
    if (this.props.status != prevProps.status) {
      switch (this.props.status) {
        case Clock.STATUS_RUNNING:
          this.start();
          break;

        case Clock.STATUS_STOPPED:
          this.stop();
          break;

        case Clock.STATUS_READY:
          this.reset();
          break;
      }
    }
  }

  /**
   * Renders the component.
   */
  render() {
    var classes = ["clock"];
    const hour = this.state.hours;
    const minute = this.state.minutes;
    const second = this.state.seconds;
    const tenths = this.state.tenths;

    if (this.state.type == 'C') {
      //change the text color when the clock reaches a threshold
      if (hour <= 0 && minute <= 0 && second <= 15 && (
        (tenths <= 0 && second === 15) || second < 15)
      ) {
        classes.push("warning");
      } else if (this.props.status === Clock.STATUS_RUNNING) {
        classes.push("running");
      }
    } else if (this.props.status == Clock.STATUS_RUNNING) {
      classes.push('running');
    }

    //append class name from properties
    if (typeof (this.props.className) === "string") {
      classes.push(this.props.className);
    }

    return (
      rec('div', {
        className: classes.join(' '),
        onClick: this.props.onClick,
        onContextMenu: this._onContextMenu
      }, this.getText())
    );
  }
}

//clock state values
Clock.STATUS_READY = 0;
Clock.STATUS_RUNNING = 1;
Clock.STATUS_STOPPED = 2;

/**
 * Counter class - scores, mostly.
 */
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: (this.props.amount) ? this.props.amount : 0,
      min: (this.props.min) ? this.props.min : -99,
      max: (this.props.max) ? this.props.max : 99
    };

    //bindings
    this._onClick = this._onClick.bind(this);
    this._onContextMenu = this._onContextMenu.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  /**
   * Increases the counter value by 1
   */
  add() {
    this.set(this.state.amount + 1);
  }

  /**
   * Decreases the counter value by 1
   */
  subtract() {
    this.set(this.state.amount - 1);
  }

  /**
   * Resets the counter
   */
  reset() {
    this.set(this.props.init);
  }

  /**
   * Sets the value
   * @param {Number} amount
   */
  set(amount) {
    if (amount < this.state.min)
      amount = this.state.min;
    else if (amount > this.state.max)
      amount = this.state.max;
    this.setState((state) => {
      return { amount: amount };
    });
  }

  /**
   * Triggered when the user clicks the counter.
   * @param {MouseEvent} ev
   */
  _onClick(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    if (ev.ctrlKey)
      this.reset();
    else if (ev.shiftKey)
      this.subtract();
    else
      this.add();
  }

  /**
   * Triggered when the user right-clicks the counter.
   * @param {MouseEvent} ev
   */
  _onContextMenu(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    this.subtract();
  }

  /**
   * Triggered when the user presses a keyboard button
   * @param {KeyEvent} ev
   */
  onKeyUp(ev) {
    ev.stopPropagation();
    ev.preventDefault();

    //counters only listen to left/right buttons
    if (ev.keyCode != keycodes.LEFT && ev.keyCode != keycodes.RIGHT)
      return;

    if (ev.ctrlKey) {
      this.reset();
    } else if (ev.shiftKey) {
      this.subtract();
    } else {
      this.add();
    }
  }

  render() {
    var classes = ["counter"];
    if (typeof (this.props.className) === "string")
      classes.push(this.props.className);

    return (
      rec('div', {
        className: classes.join(' '),
        onClick: this._onClick,
        onContextMenu: this._onContextMenu
      }, this.state.amount)
    );
  }
}

/**
 * Configuration screen
 * - Fencer names
 * - Min/Max Values
 * - Hide/Show Sontrols
 */
class ScoreboardConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FencerLeftName: this.props.values.FencerLeftName,
      FencerLeftColor: this.props.values.FencerLeftColor,
      FencerRightName: this.props.values.FencerRightName,
      FencerRightColor: this.props.values.FencerRightColor
    }

    //bindings
    this._onClickSubmit = this._onClickSubmit.bind(this);
    this._onClickCancel = this._onClickCancel.bind(this);
  }

  /**
   *
   * @param {*} ev
   */
  _onClickSubmit(ev) {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        //Left Fencer
        FencerLeftName: this.state.FencerLeftName,
        FencerLeftColor: this.state.FencerLeftColor,
        //Right Fencer
        FencerRightName: this.state.FencerRightName,
        FencerRightColor: this.state.FencerRightColor
      });
    }
  }

  /**
   * Triggered when the user clicks the cancel button.
   * @param {MouseEvent} ev
   */
  _onClickCancel(ev) {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  /**
   * Renders the component.
   */
  render() {

    var classes = ['config'];
    if (this.props.visible)
      classes.push('shown');

    return (
      rec('div', {
        className: classes.join(' ')
      }, [
        rec('div', { className: "config-items" }, [

          //Left Fencer Name
          rec('div', {
            className: "config-item"
          }, [
            rec('label', null, "Left Fencer"),
            rec('input', {
              type: "text",
              size: 20,
              maxlength: 20,
              value: this.state.FencerLeftName,
              onChange: (ev) => {
                const value = ev.target.value;
                this.setState((state) => {
                  return { FencerLeftName: value }
                });
              }
            }),
            rec('label', null, "Color"),
            rec('input', {
              type: "text",
              size: 10,
              maxlength: 20,
              value: this.state.FencerLeftColor,
              onChange: (ev) => {
                const value = ev.target.value;
                this.setState((state) => {
                  return { FencerLeftColor: value }
                });
              }
            })
          ]),

          //Right Fencer Name
          rec('div', {
            className: "config-item"
          }, [
            rec('label', null, "Right Fencer"),
            rec('input', {
              type: "text",
              size: 20,
              value: this.state.FencerRightName,
              onChange: (ev) => {
                const value = ev.target.value;
                this.setState((state) => {
                  return { FencerRightName: value };
                });
              }
            }),
            rec('label', null, "Color"),
            rec('input', {
              type: "text",
              size: 10,
              maxlength: 20,
              value: this.state.FencerRightColor,
              onChange: (ev) => {
                const value = ev.target.value;
                this.setState((state) => {
                  return { FencerRightColor: value }
                });
              }
            })
          ])
        ]),

        //Buttons
        rec('div', { className: "buttons" }, [
          rec('button', {
            onClick: this._onClickSubmit,
            className: "btn"
          }, "Submit"),
          rec('button', {
            className: "btn",
            onClick: this._onClickCancel
          }, "Cancel")
        ])
      ])
    );
  }
}

/**
 * Fencer
 */
class Fencer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: (this.props.name) ? this.props.name : "Fencer",
      cardYellow: false,
      cardRed: false,
      cardBlack: false,
      score: 0,
      doubles: 0,
      color: (this.props.color) ? this.props.color : "#222222",
      side: this.props.side
    }

    this.Score = React.createRef();

    //bindings
    this.increaseScore = this.increaseScore.bind(this);
    this.decreaseScore = this.decreaseScore.bind(this);

    this.increaseDoubles = this.increaseDoubles.bind(this);
    this.decreaseDoubles = this.decreaseDoubles.bind(this);

    this.toggleRedCard = this.toggleRedCard.bind(this);
    this.toggleYellowCard = this.toggleYellowCard.bind(this);

    this.reset = this.reset.bind(this);
    this.resetDoubles = this.resetDoubles.bind(this);
    this.resetScore = this.resetScore.bind(this);
  }

  /**
   * Increases the fencer's score
   */
  increaseScore() {
    this.Score.current.add();
  }

  /**
   * Reduces the fencers's score by 1
   */
  decreaseScore() {
    this.Score.current.subtract();
  }

  /**
   * Resets the fencer's score.
   */
  resetScore() {
    this.Score.current.reset();
  }

  /**
   * Increase doubles
   */
  increaseDoubles() {
    this.setState((state) => {
      var amount = state.doubles + 1;
      if (amount > Settings.MaxDoubles)
        amount = 0;
      return { doubles: amount };
    });
  }

  /**
   * Decrease doubles
   */
  decreaseDoubles() {
    this.setState((state) => {
      var amount = state.doubles - 1;
      if (amount < 0)
        amount = 0;
      return { doubles: amount };
    });
  }

  /**
   * Resets the doubles
   */
  resetDoubles() {
    this.setState((state) => {
      return { doubles: 0 }
    });
  }

  /**
   * Toggles the red card.
   */
  toggleRedCard() {
    this.setState((state) => {
      return { cardRed: !state.cardRed };
    });
  }

  /**
   * Toggles the yellow card.
   */
  toggleYellowCard() {
    this.setState((state) => {
      return { cardYellow: !state.cardYellow };
    });
  }

  /**
   * Shows the next card
   */
  showCard() {
    this.setState((state) => {
      if (!state.cardYellow)
        return { cardYellow: true };
      if (!state.cardRed)
        return { cardRed: true };
      return { cardYellow: false, cardRed: false };
    });
  }

  /**
   * Hides the previous card
   */
  hideCard() {
    this.setState((state) => {
      if (state.cardRed)
        return { cardRed: false };
      return { cardYellow: false };
    })
  }

  /**
   * Clears the cards
   */
  resetCards() {
    this.setState((state) => {
      return {
        cardRed: false,
        cardYellow: false
      };
    })
  }

  /**
   * Resets the Fencer Score, cards, and doubless.
   * Name and color are left alone and must be changed manually.
   */
  reset() {
    this.setState({
      cardYellow: false,
      cardRed: false,
      score: 0,
      doubles: 0
    });
    this.resetScore();
  }

  /**
   * Renders the component
   */
  render() {

    //background color of fencer's name
    var style = {
      "background": "linear-gradient(" + this.state.color + ", #000000)"
    };

    return (
      rec('div', {
        className: "fencer side-" + this.state.side, style: style
      }, [
        //Name
        rec('div', {
          className: "fencer-name"
        }, this.state.name),


        //Score
        rec(Counter, {
          min: Settings.MinScore,
          max: Settings.MaxScore,
          value: this.state.score,
          init: 0,
          ref: this.Score
        }),

        //Doubles indicators
        rec(FencerDoubles, {
          amount: this.state.doubles,
          onClick: (ev) => {
            ev.target.blur();
            ev.preventDefault();
            ev.stopPropagation();
            if (ev.ctrlKey) {
              this.setState((state) => {
                return { doubles: 0 }
              })
            } else if (ev.shiftKey) {
              this.decreaseDoubles();
            } else {
              this.increaseDoubles();
            }
          },
          onContextMenu: (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            this.decreaseDoubles();
          }
        }),
        //Cards
        rec(FencerCards, {
          yellow: this.state.cardYellow,
          red: this.state.cardRed,
          black: this.state.cardBlack
        }),

        //Controls
        rec('div', {
          className: "controls"
        }, [
          //Yellow Card
          rec(FencerCardIcon, {
            color: "yellow",
            status: this.state.cardYellow,
            title: "Yellow Card",
            onClick: (ev) => {
              this.setState((state) => {
                return { cardYellow: !state.cardYellow };
              });
            }
          }),

          //Red Card
          rec(FencerCardIcon, {
            color: "red",
            status: this.state.cardRed,
            title: "Red Card",
            onClick: (ev) => {
              this.setState((state) => {
                return { cardRed: !state.cardRed };
              });
            }
          })
        ])
      ])
    )
  }
}

/**
 * Displays grouping of cards above fencer's score
 */
class FencerCards extends React.Component {
  render() {
    var red = rec(FencerCard, {
      color: "red",
      status: this.props.red,
      key: "card-red"
    });

    var yellow = rec(FencerCard, {
      color: "yellow",
      status: this.props.yellow,
      key: "card-yellow"
    });

    //put black here if you want to - maybe with a border color ?

    return (
      rec('div', { className: "cards" }, [yellow, red])
    );
  }
}

/**
 * Fencer Card Display
 */
class FencerCard extends React.Component {
  render() {
    var className = "card " + this.props.color;
    if (this.props.status)
      className += " shown";
    return (
      rec('div', { className: className })
    )
  }
}

/**
 * Fencer Card Icons
 */
class FencerCardIcon extends React.Component {
  render() {
    var className = "card " + this.props.color;
    if (this.props.status)
      className += " active";
    return (
      rec('button', {
        className: className,
        title: this.props.title,
        onClick: this.props.onClick
      })
    )
  }
}

/**
 * Doubles Indiciators
 */
class FencerDoubles extends React.Component {
  render() {
    var elements = [];
    for (var i = 0; i < Settings.MaxDoubles; i++) {
      elements.push(rec(FencerDoubleItem, {
        amount: this.props.amount,
        onClick: this.props.onClick,
        onContextMenu: this.props.onContextMenu,
        index: (i + 1),
        key: "double-" + i
      }));
    }

    return (
      rec('div', { className: "doubles", title: "Doubles" }, elements)
    )
  }
}

/**
 * Double Indicator
 */
class FencerDoubleItem extends React.Component {
  render() {
    var className = "double-item";
    if (this.props.amount >= this.props.index)
      className += " active";
    return (
      rec('button', {
        className: className,
        onClick: this.props.onClick,
        onContextMenu: this.props.onContextMenu
      }, "D")
    );
  }
}

Fencer.CARD_NORMAL = 0;
Fencer.CARD_YELLOW = 1;
Fencer.CARD_RED = 2;
Fencer.CARD_BLACK = 3;

/* Startup */
document.addEventListener('DOMContentLoaded', function () {
  scoreboard = ReactDOM.render(
    rec(Scoreboard, null, null),
    document.getElementById('app')
  );

  //attach keyboard event handler to scoreboard
  document.addEventListener('keyup', scoreboard.onKeyUp.bind(scoreboard));
});
