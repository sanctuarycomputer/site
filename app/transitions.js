import { vars } from 'site/lib/vudu';
const duration = vars.pageTransitionDuration;

export default function(){
  this.transition(
    this.childOf('#GLOBAL--mobile-nav-bar--nav-label'),
    this.use('toUp', { duration })
  );

  this.transition(
    this.fromRoute('index'),
    this.toRoute('work'),
    this.use('bottomToTop', { duration }),
    this.reverse('topToBottom', { duration })
  );

  this.transition(
    this.fromRoute('index'),
    this.toRoute('feed'),
    this.use('bottomToTop', { duration }),
    this.reverse('topToBottom', { duration })
  );

  this.transition(
    this.fromRoute('index'),
    this.toRoute('shop'),
    this.use('bottomToTop', { duration }),
    this.reverse('topToBottom', { duration })
  );

  this.transition(
    this.fromRoute('work'),
    this.toRoute('shop'),
    this.use('toLeft', { duration }),
    this.reverse('toRight', { duration })
  );

  this.transition(
    this.fromRoute('shop'),
    this.toRoute('shop.show'),
    this.use('toLeft', { duration }),
    this.reverse('toRight', { duration })
  );

  this.transition(
    this.fromRoute('work'),
    this.toRoute('feed'),
    this.use('toRight', { duration }),
    this.reverse('toLeft', { duration })
  );

  this.transition(
    this.fromRoute('feed'),
    this.toRoute('shop'),
    this.use('toLeft', { duration }),
    this.reverse('toRight', { duration })
  );

  this.transition(
    this.fromRoute('work.index'),
    this.toRoute('work.show'),
    this.use('explode', {
      pickOld: '.explode.project-block' ,
      pickNew: '.project-block',
      use: ['work-explosion']
    }, {
      use: 'work-explosion-backing'
    }),
  );

  this.transition(
    this.fromRoute('work.show'),
    this.toRoute('work.index'),
    this.use('explode', {
      pickOld: '.project-block' ,
      pickNew: '.project-block.explode',
      use: ['reverse-work-explosion']
    }, {
      use: 'cross-fade'
    }),
  );
}
