# Data Models & Schema

## CropData
- id: string
- name: string
- targetEC: string
- targetPH: string
- yieldPerSqFtLbs: number
- marketPricePerLb: number

## SystemData
- id: string
- name: string
- costPerSqFt: number
- powerCostPerSqFtMth: number
- waterUsageGalSqFtMth: number

## ToolItem
- id: string
- title: string
- description: string
- category: Category
- primaryOutcome: string
- iconId: string
- viewId: string
