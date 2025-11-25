"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Html } from "@react-three/drei"
import { DndContext, DragOverlay, useDraggable, useDroppable, closestCenter } from "@dnd-kit/core"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart2, ChevronDown, Code, Cpu, Filter, GitBranch, Play, Plus, Save, Settings, Sliders, X, Trash2, Edit2, Download, Upload, ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { AiAssistant } from "@/components/ai-assistant"
import { STRATEGY_TEMPLATES, getTemplateDownloads, incrementTemplateDownload } from "@/lib/strategy-templates"
import { toast } from "sonner"

// Types
interface StrategyBlock {
  id: string
  type: "indicator" | "condition" | "action" | "risk"
  title: string
  color: string
  config?: Record<string, any>
  position?: { x: number; y: number }
}

interface StrategySettings {
  name: string
  market: string
  timeframe: string
  initialCapital: string
  backtestStart: string
  backtestEnd: string
  commission: string
}

// Block definitions
const BLOCK_TEMPLATES = {
  indicator: [
    { title: "Moving Average", color: "#0d9488", defaultConfig: { period: 14, type: "SMA" } },
    { title: "RSI", color: "#0d9488", defaultConfig: { period: 14 } },
    { title: "MACD", color: "#0d9488", defaultConfig: { fast: 12, slow: 26, signal: 9 } },
    { title: "Bollinger Bands", color: "#0d9488", defaultConfig: { period: 20, stdDev: 2 } },
  ],
  condition: [
    { title: "Price Above", color: "#0891b2", defaultConfig: { value: 0 } },
    { title: "Price Below", color: "#0891b2", defaultConfig: { value: 0 } },
    { title: "Crossover", color: "#0891b2", defaultConfig: { indicator1: "", indicator2: "" } },
    { title: "Percent Change", color: "#0891b2", defaultConfig: { threshold: 5 } },
  ],
  action: [
    { title: "Buy", color: "#7c3aed", defaultConfig: { quantity: 1 } },
    { title: "Sell", color: "#7c3aed", defaultConfig: { quantity: 1 } },
    { title: "Set Stop Loss", color: "#7c3aed", defaultConfig: { percentage: 5 } },
    { title: "Set Take Profit", color: "#7c3aed", defaultConfig: { percentage: 10 } },
  ],
  risk: [
    { title: "Position Size", color: "#db2777", defaultConfig: { percentage: 10 } },
    { title: "Max Drawdown", color: "#db2777", defaultConfig: { percentage: 15 } },
    { title: "Portfolio Allocation", color: "#db2777", defaultConfig: { percentage: 20 } },
  ],
}

export default function StudioPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("builder")
  const [canvasBlocks, setCanvasBlocks] = useState<StrategyBlock[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [editingBlock, setEditingBlock] = useState<StrategyBlock | null>(null)
  const [templateDownloads, setTemplateDownloads] = useState<Record<string, number>>({})
  const [settings, setSettings] = useState<StrategySettings>({
    name: "Golden Cross with RSI Filter",
    market: "Crypto",
    timeframe: "1 Day",
    initialCapital: "$10,000",
    backtestStart: "Jan 1, 2025",
    backtestEnd: "Dec 31, 2025",
    commission: "0.1%",
  })

  // Load download counts on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const downloads: Record<string, number> = {}
      STRATEGY_TEMPLATES.forEach(template => {
        downloads[template.id] = getTemplateDownloads(template.id)
      })
      setTemplateDownloads(downloads)
    }
  }, [])

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    setActiveId(null)

    if (over && over.id === "canvas") {
      const blockType = active.data.current?.type
      const blockTitle = active.data.current?.title
      const blockColor = active.data.current?.color
      const template = Object.values(BLOCK_TEMPLATES)
        .flat()
        .find((b) => b.title === blockTitle)

      if (!blockType || !blockTitle || !blockColor) {
        console.error("Missing block data:", { blockType, blockTitle, blockColor })
        return
      }

      const newBlock: StrategyBlock = {
        id: `block-${Date.now()}`,
        type: blockType,
        title: blockTitle,
        color: blockColor,
        config: template?.defaultConfig || {},
        position: {
          x: Math.random() * 400 + 100,
          y: Math.random() * 300 + 100,
        },
      }

      setCanvasBlocks([...canvasBlocks, newBlock])
      toast.success(`Added ${blockTitle} to canvas`)
    }
  }

  const deleteBlock = (id: string) => {
    setCanvasBlocks(canvasBlocks.filter((b) => b.id !== id))
    toast.success("Block removed")
  }

  const updateBlockConfig = (id: string, config: Record<string, any>) => {
    setCanvasBlocks(
      canvasBlocks.map((b) => (b.id === id ? { ...b, config: { ...b.config, ...config } } : b)),
    )
    setEditingBlock(null)
    toast.success("Block configuration updated")
  }

  const generateCode = useCallback(() => {
    if (canvasBlocks.length === 0) {
      return `// No strategy blocks added yet
// Drag and drop blocks from the sidebar to build your strategy`
    }

    const indicators = canvasBlocks.filter((b) => b.type === "indicator")
    const conditions = canvasBlocks.filter((b) => b.type === "condition")
    const actions = canvasBlocks.filter((b) => b.type === "action")
    const risks = canvasBlocks.filter((b) => b.type === "risk")

    let code = `// Algoter Generated Strategy
// ${settings.name}

function initialize() {
  // Define indicators\n`

    indicators.forEach((ind) => {
      const config = ind.config || {}
      if (ind.title === "Moving Average") {
        code += `  const ${ind.title.toLowerCase().replace(/\s+/g, "")} = ${config.type || "SMA"}(${config.period || 14});\n`
      } else if (ind.title === "RSI") {
        code += `  const ${ind.title.toLowerCase()} = RSI(${config.period || 14});\n`
      } else if (ind.title === "MACD") {
        code += `  const ${ind.title.toLowerCase()} = MACD(${config.fast || 12}, ${config.slow || 26}, ${config.signal || 9});\n`
      } else {
        code += `  const ${ind.title.toLowerCase().replace(/\s+/g, "")} = ${ind.title}(${JSON.stringify(config)});\n`
      }
    })

    if (risks.length > 0) {
      code += `\n  // Set up risk management\n`
      risks.forEach((risk) => {
        const config = risk.config || {}
        if (risk.title === "Position Size") {
          code += `  setPositionSize(${(config.percentage || 10) / 100}); // ${config.percentage || 10}% of portfolio per trade\n`
        } else if (risk.title === "Max Drawdown") {
          code += `  setMaxDrawdown(${(config.percentage || 15) / 100}); // ${config.percentage || 15}% maximum drawdown\n`
        }
      })
    }

    code += `}\n\nfunction onBar(bar) {\n`

    if (indicators.length > 0) {
      code += `  // Get indicator values\n`
      indicators.forEach((ind) => {
        code += `  const ${ind.title.toLowerCase().replace(/\s+/g, "")}Value = ${ind.title.toLowerCase().replace(/\s+/g, "")}.getValue();\n`
      })
    }

    if (conditions.length > 0 || actions.length > 0) {
      code += `\n  // Check conditions and execute actions\n`
      conditions.forEach((cond, idx) => {
        const config = cond.config || {}
        if (cond.title === "Price Above") {
          code += `  if (bar.close > ${config.value || 0}) {\n`
        } else if (cond.title === "Price Below") {
          code += `  if (bar.close < ${config.value || 0}) {\n`
        } else if (cond.title === "Crossover") {
          code += `  if (crossOver(${config.indicator1 || "indicator1"}, ${config.indicator2 || "indicator2"})) {\n`
        } else {
          code += `  if (/* ${cond.title} condition */) {\n`
        }

        const relatedActions = actions.slice(idx, idx + 1)
        relatedActions.forEach((action) => {
          if (action.title === "Buy") {
            code += `    buy();\n`
          } else if (action.title === "Sell") {
            code += `    sell();\n`
          } else if (action.title === "Set Stop Loss") {
            code += `    setStopLoss(bar.low * ${1 - (action.config?.percentage || 5) / 100});\n`
          } else if (action.title === "Set Take Profit") {
            code += `    setTakeProfit(bar.close * ${1 + (action.config?.percentage || 10) / 100});\n`
          }
        })
        code += `  }\n\n`
      })
    }

    code += `}\n\nfunction onExit() {\n  log("Strategy execution completed");\n}`

    return code
  }, [canvasBlocks, settings.name])

  const copyCode = () => {
    const code = generateCode()
    navigator.clipboard.writeText(code)
    toast.success("Code copied to clipboard!")
  }

  const saveStrategy = () => {
    if (typeof window === 'undefined') return
    const strategy = {
      blocks: canvasBlocks,
      settings,
      code: generateCode(),
    }
    localStorage.setItem("algoSensei_strategy", JSON.stringify(strategy))
    toast.success("Strategy saved successfully!")
  }

  const loadStrategy = () => {
    if (typeof window === 'undefined') return
    const saved = localStorage.getItem("algoSensei_strategy")
    if (saved) {
      const strategy = JSON.parse(saved)
      setCanvasBlocks(strategy.blocks || [])
      setSettings(strategy.settings || settings)
      toast.success("Strategy loaded successfully!")
    } else {
      toast.error("No saved strategy found")
    }
  }

  const newStrategy = () => {
    setCanvasBlocks([])
    setSettings({
      name: "New Strategy",
      market: "Crypto",
      timeframe: "1 Day",
      initialCapital: "$10,000",
      backtestStart: "Jan 1, 2025",
      backtestEnd: "Dec 31, 2025",
      commission: "0.1%",
    })
    toast.success("New strategy created")
  }

  const exportStrategy = () => {
    if (typeof window === 'undefined') return
    const strategy = {
      blocks: canvasBlocks,
      settings,
      code: generateCode(),
      exportedAt: new Date().toISOString(),
    }
    const dataStr = JSON.stringify(strategy, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${settings.name.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success("Strategy exported successfully!")
  }

  const importStrategy = () => {
    if (typeof window === 'undefined') return
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "application/json"
    input.onchange = (e: any) => {
      const file = e.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (event: any) => {
        try {
          const strategy = JSON.parse(event.target.result)
          setCanvasBlocks(strategy.blocks || [])
          setSettings(strategy.settings || settings)
          toast.success("Strategy imported successfully!")
        } catch (error) {
          console.error("Error importing strategy:", error)
          toast.error("Failed to import strategy. Invalid file format.")
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <color attach="background" args={["#050505"]} />
          <Environment preset="city" />
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5} position={[0, 3, 0]}>
            <group>
              {[...Array(8)].map((_, i) => (
                <mesh key={i} position={[i * 0.7 - 2.45, 0, 0]}>
                  <boxGeometry args={[0.6, 1, 0.2]} />
                  <meshStandardMaterial color="#14b8a6" metalness={0.8} roughness={0.2} />
                </mesh>
              ))}
            </group>
          </Float>
          <StudioScene activeTab={activeTab} blocks={canvasBlocks} />
        </Canvas>
      </div>

      <Navigation />
      <AiAssistant />

      <div className="absolute inset-0 z-20 flex flex-col p-4 pointer-events-none">
        <div className="flex justify-between items-center mb-4 pointer-events-auto">
          <div className="flex items-center">
            <Button
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-900/20 mr-2"
              onClick={newStrategy}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Strategy
            </Button>
            <Button
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-900/20 mr-2"
              onClick={saveStrategy}
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-900/20 mr-2"
              onClick={loadStrategy}
            >
              Load
            </Button>
            <Button
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-900/20 mr-2"
              onClick={exportStrategy}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-900/20 mr-2"
              onClick={importStrategy}
            >
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-teal-500 text-teal-500 hover:bg-teal-900/20 mr-2"
                >
                  <GitBranch className="mr-2 h-4 w-4" />
                  Load Template
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black/95 border-teal-500/30 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white">Strategy Templates</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {STRATEGY_TEMPLATES.map((template) => {
                    const downloadCount = templateDownloads[template.id] || 0
                    return (
                      <Card
                        key={template.id}
                        className="bg-gray-900/50 border-teal-500/30 cursor-pointer hover:border-teal-500 transition-colors"
                        onClick={() => {
                          setCanvasBlocks(template.blocks.map(block => ({
                            ...block,
                            position: block.position || { x: 0, y: 0 }
                          })))
                          setSettings(template.settings)
                          // Increment download count
                          const newCount = incrementTemplateDownload(template.id)
                          setTemplateDownloads(prev => ({
                            ...prev,
                            [template.id]: newCount
                          }))
                          toast.success(`Loaded template: ${template.name}`)
                        }}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-white text-lg">{template.name}</CardTitle>
                              <CardDescription className="text-gray-400">{template.description}</CardDescription>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-teal-400 text-sm font-medium flex items-center gap-1">
                                <Download className="h-3 w-3" />
                                {downloadCount} downloads
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {template.blocks.map((block) => (
                              <Badge key={block.id} variant="outline" className="border-teal-500/30 text-teal-400">
                                {block.title}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-900/20"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
          <div className="flex items-center">
            <Button
              className="bg-teal-500 hover:bg-teal-600 text-black font-bold mr-2"
              onClick={() => router.push("/backtest")}
            >
              <Play className="mr-2 h-4 w-4" />
              Run Backtest
            </Button>
            <Button
              variant="outline"
              className="border-teal-500 text-teal-500 hover:bg-teal-900/20"
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900/50 pointer-events-auto">
              <TabsTrigger value="builder" className="data-[state=active]:bg-teal-500 data-[state=active]:text-black">
                Strategy Builder
              </TabsTrigger>
              <TabsTrigger value="code" className="data-[state=active]:bg-teal-500 data-[state=active]:text-black">
                Code View
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-teal-500 data-[state=active]:text-black">
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="builder" className="flex-1 flex mt-4">
              <div className="w-64 bg-black/80 border-teal-500/30 backdrop-blur-md rounded-lg p-4 mr-4 pointer-events-auto overflow-y-auto">
                <h3 className="text-white font-medium mb-3">AlgoBlocks</h3>
                <div className="space-y-3">
                  <BlockCategory title="Indicators" icon={<BarChart2 className="h-4 w-4 text-teal-500" />}>
                    {BLOCK_TEMPLATES.indicator.map((block) => (
                      <DraggableBlock key={block.title} title={block.title} color={block.color} type="indicator" />
                    ))}
                  </BlockCategory>

                  <BlockCategory title="Conditions" icon={<Filter className="h-4 w-4 text-teal-500" />}>
                    {BLOCK_TEMPLATES.condition.map((block) => (
                      <DraggableBlock key={block.title} title={block.title} color={block.color} type="condition" />
                    ))}
                  </BlockCategory>

                  <BlockCategory title="Actions" icon={<Sliders className="h-4 w-4 text-teal-500" />}>
                    {BLOCK_TEMPLATES.action.map((block) => (
                      <DraggableBlock key={block.title} title={block.title} color={block.color} type="action" />
                    ))}
                  </BlockCategory>

                  <BlockCategory title="Risk Management" icon={<Cpu className="h-4 w-4 text-teal-500" />}>
                    {BLOCK_TEMPLATES.risk.map((block) => (
                      <DraggableBlock key={block.title} title={block.title} color={block.color} type="risk" />
                    ))}
                  </BlockCategory>
                </div>
              </div>

              <CanvasDropZone
                blocks={canvasBlocks}
                onDelete={deleteBlock}
                onEdit={setEditingBlock}
              />
            </TabsContent>

            <TabsContent value="code" className="flex-1 mt-4">
              <div className="bg-black/80 border-teal-500/30 backdrop-blur-md rounded-lg p-4 h-full pointer-events-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-medium">Generated Code</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-teal-500 text-teal-500 hover:bg-teal-900/20"
                    onClick={copyCode}
                  >
                    <Code className="mr-2 h-4 w-4" />
                    Copy Code
                  </Button>
                </div>

                <div className="h-[calc(100%-40px)] bg-gray-900/50 rounded-lg border border-gray-800 p-4 font-mono text-sm text-gray-300 overflow-auto">
                  <pre className="whitespace-pre-wrap">{generateCode()}</pre>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="flex-1 mt-4">
              <SettingsTab settings={settings} onSettingsChange={setSettings} />
            </TabsContent>
          </Tabs>

          <DragOverlay>
            {activeId ? (
              <div className="bg-teal-500/20 border border-teal-500 rounded p-2 text-white text-sm">
                Dragging...
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {editingBlock && (
          <BlockConfigDialog
            block={editingBlock}
            onClose={() => setEditingBlock(null)}
            onSave={(config) => updateBlockConfig(editingBlock.id, config)}
          />
        )}
      </div>
    </main>
  )
}

// Draggable Block Component
function DraggableBlock({ title, color, type }: { title: string; color: string; type: string }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${title}`,
    data: { title, color, type },
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex items-center p-2 rounded cursor-move hover:bg-gray-800 text-sm text-white"
    >
      <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: color }}></div>
      {title}
    </div>
  )
}

// Canvas Drop Zone
function CanvasDropZone({
  blocks,
  onDelete,
  onEdit,
}: {
  blocks: StrategyBlock[]
  onDelete: (id: string) => void
  onEdit: (block: StrategyBlock) => void
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas",
  })

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 bg-black/80 border-teal-500/30 backdrop-blur-md rounded-lg p-4 pointer-events-auto relative ${
        isOver ? "border-teal-500 border-2" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-medium">Strategy Canvas</h3>
        <div className="text-gray-400 text-sm">{blocks.length} blocks</div>
      </div>

      <div className="h-[calc(100%-40px)] bg-gray-900/50 rounded-lg border border-gray-800 relative overflow-hidden">
        {blocks.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <p>Drag and drop AlgoBlocks here to build your strategy</p>
              <p className="text-sm mt-2 text-gray-500">
                {isOver ? "Drop here!" : "Drop blocks from the sidebar"}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {blocks.map((block) => (
              <div
                key={block.id}
                className="bg-gray-800/50 rounded-lg p-3 border border-gray-700 flex items-center justify-between group hover:border-teal-500 transition-colors"
                style={{ borderLeftColor: block.color, borderLeftWidth: "4px" }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: block.color }}></div>
                  <div>
                    <div className="text-white font-medium">{block.title}</div>
                    <div className="text-gray-400 text-xs">{block.type}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-gray-400 hover:text-teal-400"
                    onClick={() => onEdit(block)}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-gray-400 hover:text-red-400"
                    onClick={() => onDelete(block.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Block Configuration Dialog
function BlockConfigDialog({
  block,
  onClose,
  onSave,
}: {
  block: StrategyBlock
  onClose: () => void
  onSave: (config: Record<string, any>) => void
}) {
  const [config, setConfig] = useState(block.config || {})

  const handleSave = () => {
    onSave(config)
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Configure {block.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {block.title === "Moving Average" && (
            <>
              <div>
                <Label className="text-gray-300">Period</Label>
                <Input
                  type="number"
                  value={config.period || 14}
                  onChange={(e) => setConfig({ ...config, period: parseInt(e.target.value) })}
                  className="bg-gray-800 border-gray-700 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-300">Type</Label>
                <select
                  value={config.type || "SMA"}
                  onChange={(e) => setConfig({ ...config, type: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white mt-1"
                >
                  <option>SMA</option>
                  <option>EMA</option>
                </select>
              </div>
            </>
          )}
          {block.title === "RSI" && (
            <div>
              <Label className="text-gray-300">Period</Label>
              <Input
                type="number"
                value={config.period || 14}
                onChange={(e) => setConfig({ ...config, period: parseInt(e.target.value) })}
                className="bg-gray-800 border-gray-700 text-white mt-1"
              />
            </div>
          )}
          {block.title === "Price Above" || block.title === "Price Below" ? (
            <div>
              <Label className="text-gray-300">Value</Label>
              <Input
                type="number"
                value={config.value || 0}
                onChange={(e) => setConfig({ ...config, value: parseFloat(e.target.value) })}
                className="bg-gray-800 border-gray-700 text-white mt-1"
              />
            </div>
          ) : null}
          {(block.title === "Position Size" || 
            block.title === "Max Drawdown" ||
            block.title === "Portfolio Allocation" ||
            block.title === "Set Stop Loss" ||
            block.title === "Set Take Profit") ? (
            <div>
              <Label className="text-gray-300">Percentage</Label>
              <Input
                type="number"
                value={config.percentage || (block.title === "Set Stop Loss" ? 5 : block.title === "Set Take Profit" ? 10 : 10)}
                onChange={(e) => setConfig({ ...config, percentage: parseFloat(e.target.value) })}
                className="bg-gray-800 border-gray-700 text-white mt-1"
              />
            </div>
          ) : null}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose} className="border-gray-700">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-teal-500 hover:bg-teal-600 text-black">
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Settings Tab
function SettingsTab({
  settings,
  onSettingsChange,
}: {
  settings: StrategySettings
  onSettingsChange: (settings: StrategySettings) => void
}) {
  return (
    <div className="bg-black/80 border-teal-500/30 backdrop-blur-md rounded-lg p-4 h-full pointer-events-auto">
      <h3 className="text-white font-medium mb-4">Strategy Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="text-gray-300">Strategy Name</Label>
            <Input
              type="text"
              className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-white mt-1"
              value={settings.name}
              onChange={(e) => onSettingsChange({ ...settings, name: e.target.value })}
            />
          </div>

          <div>
            <Label className="text-gray-300">Market</Label>
            <select
              value={settings.market}
              onChange={(e) => onSettingsChange({ ...settings, market: e.target.value })}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-white mt-1"
            >
              <option>Crypto</option>
              <option>Stocks</option>
              <option>Forex</option>
              <option>Futures</option>
            </select>
          </div>

          <div>
            <Label className="text-gray-300">Timeframe</Label>
            <select
              value={settings.timeframe}
              onChange={(e) => onSettingsChange({ ...settings, timeframe: e.target.value })}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-white mt-1"
            >
              <option>1 Hour</option>
              <option>4 Hours</option>
              <option>1 Day</option>
              <option>1 Week</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-gray-300">Initial Capital</Label>
            <Input
              type="text"
              className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-white mt-1"
              value={settings.initialCapital}
              onChange={(e) => onSettingsChange({ ...settings, initialCapital: e.target.value })}
            />
          </div>

          <div>
            <Label className="text-gray-300">Backtest Period</Label>
            <div className="grid grid-cols-2 gap-3 mt-1">
              <Input
                type="text"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                value={settings.backtestStart}
                onChange={(e) => onSettingsChange({ ...settings, backtestStart: e.target.value })}
              />
              <Input
                type="text"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                value={settings.backtestEnd}
                onChange={(e) => onSettingsChange({ ...settings, backtestEnd: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-300">Commission</Label>
            <Input
              type="text"
              className="w-full bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-white mt-1"
              value={settings.commission}
              onChange={(e) => onSettingsChange({ ...settings, commission: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button className="bg-teal-500 hover:bg-teal-600 text-black font-bold">Save Settings</Button>
      </div>
    </div>
  )
}

// Block Category Component
function BlockCategory({
  title,
  icon,
  children,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div>
      <button
        className="w-full flex items-center justify-between text-white text-sm font-medium p-2 hover:bg-gray-800 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && <div className="pl-4 mt-1 space-y-1">{children}</div>}
    </div>
  )
}

// Studio Scene Component
function StudioScene({ activeTab, blocks }: { activeTab: string; blocks: StrategyBlock[] }) {
  const sceneRef = useRef()

  useFrame(({ clock }) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  const sceneBlocks = []

  if (activeTab === "builder") {
    // Show blocks from canvas
    blocks.slice(0, 5).forEach((block, index) => {
      const angle = (index / blocks.length) * Math.PI * 2
      const radius = 3
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      sceneBlocks.push(
        <group key={block.id} position={[x, y, 0]}>
          <mesh>
            <boxGeometry args={[1.5, 0.8, 0.4]} />
            <meshStandardMaterial
              color={block.color}
              emissive={block.color}
              emissiveIntensity={0.3}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>,
      )
    })
  } else if (activeTab === "code") {
    for (let i = 0; i < 20; i++) {
      const x = (Math.random() - 0.5) * 15
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 5

      sceneBlocks.push(
        <mesh key={`code-block-${i}`} position={[x, y, z]}>
          <boxGeometry args={[2, 0.5, 0.1]} />
          <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.3} transparent opacity={0.6} />
        </mesh>,
      )
    }
  } else if (activeTab === "settings") {
    const gearPoints = 8
    const innerRadius = 2
    const outerRadius = 4

    for (let i = 0; i < gearPoints; i++) {
      const angle = (i / gearPoints) * Math.PI * 2
      const x1 = Math.cos(angle) * innerRadius
      const y1 = Math.sin(angle) * innerRadius
      const x2 = Math.cos(angle) * outerRadius
      const y2 = Math.sin(angle) * outerRadius

      sceneBlocks.push(
        <mesh key={`gear-inner-${i}`} position={[x1, y1, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.5} />
        </mesh>,
      )

      sceneBlocks.push(
        <mesh key={`gear-outer-${i}`} position={[x2, y2, 0]}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshStandardMaterial color="#0d9488" emissive="#0d9488" emissiveIntensity={0.5} />
        </mesh>,
      )
    }
  }

  return (
    <group ref={sceneRef} position={[0, -1, 0]}>
      {sceneBlocks}
    </group>
  )
}
