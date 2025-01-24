/* eslint-disable import/extensions */
import {
   getEntityCombinedSelectionSchema,
   secondaryInfoSchema,
   getBaseMainConfigSchema,
   customColorsSchema,
 } from "./_schema-base";
 import localize from "../../localize/localize";
 
 const mainSchema = {
   ...getBaseMainConfigSchema("supply"),
   schema: [
     ...getBaseMainConfigSchema("supply").schema,
     {
       name: "color_circle",
       label: "Circle Color",
       selector: { boolean: {} },
     },
     {
       name: "color_value",
       label: "Color of Value",
       selector: { boolean: {} },
     },
   ],
 };
 
 export const supplySchema = [
   getEntityCombinedSelectionSchema(),
   mainSchema,
   customColorsSchema,
   {
     title: localize("editor.secondary_info"),
     name: "secondary_info",
     type: "expandable",
     schema: secondaryInfoSchema,
   },
 ] as const;