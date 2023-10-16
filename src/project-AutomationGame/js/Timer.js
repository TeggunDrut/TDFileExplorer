class Timer {
  constructor(duration, func, recurisive = false) {
    this.duration = duration;
    this.func = func;
    this.recursive = recurisive;
    this.ticks = 0;
    this.complete = false;
  }
  update() {
    if (this.complete && !this.recursive) return;
    this.ticks++;
    
    if(this.complete) {
      console.log("recurisive");
      this.func();
    }

    if (this.ticks >= this.duration) {
      this.ticks = 0;
      this.complete = true;
      return true;
    } else {
      this.complete = false;
      return false;
    }
  }
}
