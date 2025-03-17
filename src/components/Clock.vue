<template>
  <div id="clock" class="row text-center">
    <h2 id="time" class="display-6 mb-0"></h2>
    <h2 id="timer" class="display-5 mb-0"></h2>
  </div>
</template>

<script>
export default {
  name: 'Clock',
  data() {
    return {
      twentyFour: true,
      showTimer: false,
      showMilli: false,
      hideClock: false,
      clockInterval: 1000,
      timerInterval: 10,
      timer: new Date(),
      clockIntervalID: null,
      timerIntervalID: null,
      timerSetup: null,
      timerhour: 0,
      timerminutes: 0,
      timerseconds: 0,
      timermseconds: 0,
    };
  },
  mounted() {
    this.updateClock();
    this.clockIntervalID = setInterval(this.updateClock, this.clockInterval);
    if (this.hideClock) {
      this.toggleClock(true);
    }
  },
  methods: {
    updateClock() {
      const date = new Date();
      let ampm;
      let [hour, minutes, seconds, mseconds] = [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
      ];
      ampm = hour >= 12 ? 'pm' : 'am';
      if (hour < 10) {
        hour = '0' + hour;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      if (mseconds < 10) {
        mseconds = '00' + mseconds;
      }
      if (mseconds < 100 && mseconds > 10) {
        mseconds = '0' + mseconds;
      }
      if (this.twentyFour) {
        this.$refs.time.innerHTML = `${hour}:${minutes}:${seconds}`;
      } else {
        hour = hour % 12;
        hour = hour ? hour : 12;
        this.$refs.time.innerHTML = `${hour}:${minutes}:${seconds}`;
      }
      if (this.showMilli) {
        mseconds = mseconds.toString();
        this.$refs.time.innerHTML += `:${mseconds.substring(0, 2)}`;
      }
      this.$refs.time.innerHTML += ` ${ampm}`;
    },
    updateInterval(showMilliseconds) {
      clearInterval(this.clockIntervalID);
      if (showMilliseconds) {
        this.clockInterval = 10;
        this.clockIntervalID = setInterval(this.updateClock, this.clockInterval);
      } else {
        this.clockInterval = 1000;
        this.clockIntervalID = setInterval(this.updateClock, this.clockInterval);
      }
    },
    updateTimerInterval() {
      clearInterval(this.timerIntervalID);
      this.timerInterval = 10;
      this.timerIntervalID = setInterval(this.updateTimer, this.timerInterval);
    },
    updateTimer() {
      if (this.timerSetup) {
        [this.timerhour, this.timerminutes, this.timerseconds, this.timermseconds] = [0, 0, 0, 0];
        this.timerSetup = false;
      }
      this.timermseconds += this.timerInterval;
      if (this.timermseconds >= 1000) {
        this.timermseconds = 0;
        this.timerseconds += 1;
      }
      if (this.timerseconds >= 60) {
        this.timerseconds = 0;
        this.timerminutes += 1;
      }
      if (this.timerminutes >= 60) {
        this.timerminutes = 0;
        this.timerhour += 1;
      }
      if (this.showTimer) {
        let s_hours = this.timerhour.toString();
        let s_minutes = this.timerminutes.toString();
        let s_seconds = this.timerseconds.toString();
        let s_mseconds = this.timermseconds.toString();
        if (s_hours.length < 2) {
          s_hours = '0' + s_hours;
        }
        if (s_minutes.length < 2) {
          s_minutes = '0' + s_minutes;
        }
        if (s_seconds.length < 2) {
          s_seconds = '0' + s_seconds;
        }
        if (s_mseconds.length < 2) {
          s_mseconds = '0' + s_mseconds;
        }
        this.$refs.timer.innerHTML = `${s_hours}:${s_minutes}:${s_seconds}:${s_mseconds.substring(0, 2)}`;
      }
    },
    toggleClock(isStartup) {
      if (isStartup === undefined) {
        isStartup = false;
      }
      if (!isStartup) {
        this.hideClock = !this.hideClock;
      }
      if (this.hideClock) {
        this.$refs.clock.style.display = 'none';
      } else {
        this.$refs.clock.style.display = 'block';
      }
    },
  },
};
</script>

<style scoped>
#clock {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
