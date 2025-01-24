import { html } from "lit";
import { SupplyObject } from "../type";

export const supplyElement = ({ supply }: { supply: SupplyObject }) => {
  return html`<div class="circle-container supply">
    <div class="circle">
      <ha-icon id="supply-icon" .icon=${supply.icon}></ha-icon>
      <span class="value">${supply.state.totalSupply ?? 0} W</span>
      ${supply.state.toGrid !== null
        ? html`<span class="export">
            <ha-icon class="small" .icon=${"mdi:arrow-up"}></ha-icon>
            ${supply.state.toGrid} W
          </span>`
        : null}
    </div>
    <span class="label">${supply.name}</span>
  </div>`;
};