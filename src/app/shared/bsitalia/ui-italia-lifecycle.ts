import { AfterViewInit } from '@angular/core';

export const init = () => {
  // setTimeout(() => {
  window.console.error('INIT!');
  let node: any = document.getElementById('bootstrapitaliajs');
  if (node) {
    node.parentNode?.removeChild(node);
  }
  node = document.createElement('script');
  node.src = 'bootstrap-italia/dist/js/bootstrap-italia.bundle.min.js';
  node.id = 'bootstrapitaliajs';
  node.type = 'text/javascript';
  node.async = true;
  node.charset = 'utf-8';
  document.getElementsByTagName('body')[0].appendChild(node);
  // });
};

export class BSItaliaBase implements AfterViewInit {
  ngAfterViewInit(): void {
    // init();
    // document.dispatchEvent(new Event('changed.bs.form-control'));

    const inputSelector =
      'input[type="text"],' +
      'input[type="password"],' +
      'input[type="email"],' +
      'input[type="email"],' +
      'input[type="url"],' +
      'input[type="tel"],' +
      'input[type="number"],' +
      'input[type="search"],' +
      'textarea';
    $(inputSelector).trigger('change');

    ($('select') as any).selectpicker('refresh');
  }
}
