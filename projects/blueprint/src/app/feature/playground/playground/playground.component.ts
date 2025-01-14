import { ChangeDetectionStrategy, Component, computed, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { convertFactorioVersionToString, decodeBlueprint } from '../../../core/utils/utils';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-playground',
  imports: [FormsModule, JsonPipe, TextareaModule],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent implements OnInit {
  // Declare an input named 'value' with a default value of zero.
  blueprintString = model<string>();

  parsedBlueprint = computed(() =>
    this.blueprintString()
      ? decodeBlueprint(this.blueprintString() || '')
      : {}
  );

  blueprintVersion = computed<string>(() => {
      const parsed = this.parsedBlueprint();
      if (!parsed?.blueprint?.version) {
          return 'No blueprint loaded';
      }
      return convertFactorioVersionToString(parsed.blueprint.version);
  });

  ngOnInit() {
    this.blueprintString.set('0eNqtV9GOoyAU/ZWGZ5woiNX+wyabzONkMkHLdMkgMoC70zT990U7a9stbRX7VIp6zr3nHrnXHShFy5Tm0oLVDvCqkQasXnbA8I2kotuTtGZgBagxrC4Fl5uoptUvLlmEwR4CLtfsC6yS/SsETFpuOTsg9H+2b7KtS6bdDfAfEvtSmhkTte5JvdGN+41KJiyAQDXGATSy43WgeZw9EQi2YJUi8kQc25prVh3uyCGwW9UBcqla62K54ERBnMUsTnzBaTWVRjXaXmNM4huMHoo0JK0knZUWGTjLVnxEXBqmrbtws2ZutfdgZQNWzda8rSMmXCSaV5FqBPNB5vcgl7NUz8aongepfiRZBqheTFUqQfeUSuLRlTyxzDWw41vtPR9uuiPvBXFy8F6EqlGK6aiiZZ/ZYf/ts6XCMbrrstG1O5F8UaDx5jw6qfi/HgnyYePxcsVnqfnA0vFg6HqgqQ+aTK3ESXUfV4ks3A84eVgUywA/fNPf9UM+WefBFjg+z9AoWrFICWrfXS7Re3eQ0P7RaekWAa66TNfnKhSHu+px9URJQPPBeMyhjiYcHcNcgJH/9UZ43rzhCXloEU1rrw05aXg77Rl9mCTg1Otlua94Nq+PBoq0DO+kV0XKAzrpSFsW86ZlnIaIhOPpU9SJe9MxmeFkzqQ2kgPNG5DHqOe+dv64692nzksGCSwgeYX9yr2P3bLolst+2e0c1u4pblndOWb47IJAUBeS2/vRrFtB9eK56wuLn999YXHWF34zbfqQSIaKtCgIQSTDKNnv/wIhzYAS')
  }
}
