import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { DabeloperService } from '../../services/dabeloper.service';
import { AnalyticsService } from '../../services/analytics.service';
declare var $: any;
@Component({
  selector: 'app-hire',
  standalone: true,
  imports: [
    CommonModule,
    NgxTypedJsModule,
    TranslateModule
  ],
  templateUrl: './hire.component.html',
  styleUrl: './hire.component.scss'
})
export class HireComponent implements AfterViewInit {
  @ViewChild("confetti", { static: true }) confetti: any;

  public typings!: string[];
  public checkingStg = '';
  public viewWidth = 512;
  public viewHeight = 350;
  public showTryAgain = false;
  public fitLoading = true;
  public buttonClass: string = 'button';
  public conffetiAnimation = false;
  private confettiElement!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D | null;
  private HALF_PI = Math.PI * 0.5;
  private particles: any[] = [];
  private timeStep = (1/60);
  private Ease = {
    inCubic: (t: number, b:number , c: number, d:number) => {
        t /= d;
        return c*t*t*t + b;
    },
    outCubic: (t: number, b:number , c: number, d:number) => {
        t /= d;
        t--;
        return c*(t*t*t + 1) + b;
    },
    inOutCubic: (t: number, b:number , c: number, d:number) => {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    },
    inBack: (t: number, b:number , c: number, d:number, s: number) => {
        s = s || 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    }
  };

  constructor ( private translate: TranslateService,
                private dabeloper: DabeloperService,
                private analytics: AnalyticsService ) {
  }

  get optionsA(): string[] {
    return this.dabeloper.talents?.slice(0, 3).map( t => t.content.title );
  }

  get optionsB(): string[] {
    return this.dabeloper.talents?.slice(3).map( t => t.content.title );
  }

  ngAfterViewInit(): void {
    this.createParticles();
    this.confettiElement = this.confetti.nativeElement;
    this.ctx = this.confettiElement.getContext("2d");
    setTimeout( () => {
      this.typings = [
        this.translate.instant("check.typings.one"),
        this.translate.instant("check.typings.two")
      ];
      this.checkingStg = this.translate.instant("check.checking");
    }, 1000);
  }

  checkOption(i: number, event: any): void {
    if ( event?.target?.checked ) {
      this.analytics.trackCheckListSelected( this.dabeloper.talents[i] );
    }
  }

  checkMyFit(): void {
    this.buttonClass = 'button button--loading';
    this.analytics.trackCheckListValidateBtn();
  }

  checkAgain(): void {
    this.buttonClass = "button";
    this.showTryAgain = false;
    this.conffetiAnimation = false;
    this.analytics.trackCheckListCheckAgainBtn();
  }

  showConfetti() {
    this.showTryAgain = true;
    this.conffetiAnimation = true;
    setTimeout(
      () => {
        requestAnimationFrame( () => { this.animate() } );
      }, 500
    );
  }

  animate() {
    this.update();
    this.draw();

    if (this.checkParticlesComplete()) {
      this.particles = [];
      this.createParticles();
      if ( !this.conffetiAnimation ) return;
    }

    requestAnimationFrame( () => { this.animate() } );
  }

  checkParticlesComplete() {
    for (var i = 0; i < this.particles.length; i++) {
        if (this.particles[i].complete === false) return false;
    }
    return true;
  }

  cubeBezier(p0: any, c0: any, c1: any, p1: any, t: any) {
      var p = {x: 0, y: 0};
      var nt = (1 - t);

      p.x = nt * nt * nt * p0.x + 3 * nt * nt * t * c0.x + 3 * nt * t * t * c1.x + t * t * t * p1.x;
      p.y = nt * nt * nt * p0.y + 3 * nt * nt * t * c0.y + 3 * nt * t * t * c1.y + t * t * t * p1.y;

      return p;
  }

  createParticles() {
    for (var i = 0; i < 128; i++) {
        var p0 = { x: this.viewWidth * 0.5, y: this.viewHeight * 0.5 };
        var p1 = { x: Math.random() * this.viewWidth, y: Math.random() * this.viewHeight };
        var p2 = { x: Math.random() * this.viewWidth, y: Math.random() * this.viewHeight };
        var p3 = { x: Math.random() * this.viewWidth, y: this.viewHeight + 64 };

        this.particles.push({
          p0, p1, p2, p3,
          time: 0,
          duration: 3 + Math.random() * 2,
          color:  '#' + Math.floor((Math.random() * 0xffffff)).toString(16),
          w: 8,
          h: 6,
          r: Math.atan2(p0.y, p0.x) + this.HALF_PI,
          sy: Math.sin(Math.PI * 1 * 10),
          x: p0.x,
          y: p0.y,
          complete: false, 
        });
    }
  }

  updateParticle(particle: any) {
    particle.time = Math.min(particle.duration, particle.time + this.timeStep);

    var f = this.Ease.outCubic(particle.time, 0, 1, particle.duration);
    var point = this.cubeBezier(particle.p0, particle.p1, particle.p2, particle.p3, f);

    var dx = point.x - particle.x;
    var dy = point.y - particle.y;

    particle.r =  Math.atan2(dy, dx) + this.HALF_PI;
    particle.sy = Math.sin(Math.PI * f * 10);
    particle.x = point.x;
    particle.y = point.y;

    particle.complete = particle.time === particle.duration;
  }

  drawParticle(particle: any) {
    if (!this.ctx) return;
      this.ctx.save();
      this.ctx.translate(particle.x, particle.y);
      this.ctx.rotate(particle.r);
      this.ctx.scale(1, particle.sy);

      this.ctx.fillStyle = particle.color;
      this.ctx.fillRect(-particle.w * 0.5, -particle.h * 0.5, particle.w, particle.h);

      this.ctx.restore();
  }

  update() {
    this.particles.forEach( (p) => {
        this.updateParticle(p);
    });
  }

  draw() {
    if (this.ctx) this.ctx.clearRect(0, 0, this.viewWidth, this.viewHeight);

    this.particles.forEach( (p) => {
        this.drawParticle(p);
    });
  }

}
