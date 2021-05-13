import { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import { Directive, OnInit, ElementRef, Renderer2, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

export const LANGUAGES: string[] = [
  'it',
  'en'
];


@Directive({
  selector: '[appActiveMenu]'
})
export class ActiveMenuDirective implements OnInit {
  @Input() appActiveMenu?: string;

  constructor(private el: ElementRef, private renderer: Renderer2, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateActiveFlag(event.lang);
    });

    this.updateActiveFlag(this.translateService.currentLang);
  }

  updateActiveFlag(selectedLanguage: string): void {
    if (this.appActiveMenu === selectedLanguage) {
      this.renderer.addClass(this.el.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'active');
    }
  }
}

@Pipe({ name: 'findLanguageFromKey' })
export class FindLanguageFromKeyPipe implements PipeTransform {
  private languages: { [key: string]: { name: string; rtl?: boolean } } = {
    en: { name: 'ENG' },
    it: { name: 'ITA' }
    // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
  };

  transform(lang: string): string {
    return this.languages[lang].name;
  }
}
