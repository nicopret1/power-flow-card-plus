import { html } from "lit";
import { PowerFlowCardPlus } from "../power-flow-card-plus";
import { displayValue } from "../utils/displayValue";
import { TemplatesObj } from "../type";
import { ConfigEntities, PowerFlowCardPlusConfig } from "../power-flow-card-plus-config";

export const generatorElement = (
  main: PowerFlowCardPlus,
  config: PowerFlowCardPlusConfig,
  { entities, generator, templatesObj }: { entities: ConfigEntities; generator: any; templatesObj: TemplatesObj }
) => {
  return html`<div class="circle-container generator">
    <div
      class="circle"
      @click=${(e: { stopPropagation: () => void; target: HTMLElement }) => {
        const target = entities.generator?.entity;
        main.openDetails(e, entities.generator?.tap_action, target);
      }}
    >
      ${generator.icon
        ? html` <ha-icon id="generator-icon" .icon=${generator.icon} />`
        : null}
      ${generator.state?.fromGenerator !== null
        ? html` <span class="consumption">
            <ha-icon class="small" .icon=${"mdi:arrow-right"}></ha-icon>
            ${displayValue(main.hass, config, generator.state.fromGenerator, {
              unit: generator.unit,
              unitWhiteSpace: generator.unit_white_space,
              decimals: generator.decimals,
              watt_threshold: config.watt_threshold,
            })}
          </span>`
        : null}
    </div>
    <span class="label">${generator.name || "Generator"}</span>
  </div>`;
};