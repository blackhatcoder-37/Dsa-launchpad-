import type { Module } from "@/data/curriculum";

// Hand-drawn-ish SVG illustrating the topic of the day.
export function ModuleDiagram({ module }: { module: Module }) {
  const day = module.day;

  // Decide which sketch to render
  if ([1, 2].includes(day)) return <ArraySketch />;
  if (day === 3) return <TwoPointerSketch />;
  if (day === 4) return <HashMapSketch />;
  if (day === 5) return <LinkedListSketch />;
  if (day === 6) return <StackSketch />;
  if (day === 7) return <QueueSketch />;
  if (day === 8) return <BinarySearchSketch />;
  if (day === 9) return <SlidingWindowSketch />;
  if ([10, 12, 13].includes(day)) return <SortSketch />;
  if (day === 11 || day === 23) return <RecursionSketch />;
  if (day === 14) return <MatrixSketch />;
  if ([16, 17, 18].includes(day)) return <TreeSketch />;
  if ([19, 20].includes(day)) return <GraphSketch />;
  if (day === 21) return <HeapSketch />;
  if (day === 24) return <BitsSketch />;
  return <ArraySketch />;
}

const sketch = "stroke-[var(--lantern)] fill-none";
const ink = "stroke-[var(--foreground)]";
const blossom = "fill-[var(--blossom)] stroke-[var(--blossom)]";
const moss = "fill-[var(--moss)] stroke-[var(--moss)]";

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <figure className="hand-card p-5">
      <svg viewBox="0 0 400 220" className="w-full h-auto">
        {children}
      </svg>
      <figcaption className="mt-2 text-xs text-muted-foreground text-center font-mono">
        {label}
      </figcaption>
    </figure>
  );
}

function ArraySketch() {
  return (
    <Frame label="Contiguous memory — one cubby per index">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <g key={i}>
          <rect
            x={20 + i * 50}
            y={70}
            width={46}
            height={60}
            rx={8}
            className={`${sketch}`}
            strokeWidth={2}
          />
          <text
            x={43 + i * 50}
            y={108}
            textAnchor="middle"
            className="fill-[var(--foreground)] font-mono text-[14px]"
          >
            {[7, 3, 9, 1, 4, 8, 2][i]}
          </text>
          <text
            x={43 + i * 50}
            y={155}
            textAnchor="middle"
            className="fill-[var(--muted-foreground)] text-[11px]"
          >
            [{i}]
          </text>
        </g>
      ))}
    </Frame>
  );
}

function TwoPointerSketch() {
  return (
    <Frame label="Two pointers walk inward from each end">
      {"GHIBLI".split("").map((c, i) => (
        <g key={i}>
          <rect
            x={60 + i * 50}
            y={80}
            width={40}
            height={50}
            rx={8}
            className={sketch}
            strokeWidth={2}
          />
          <text
            x={80 + i * 50}
            y={113}
            textAnchor="middle"
            className="fill-[var(--foreground)] font-mono text-[16px]"
          >
            {c}
          </text>
        </g>
      ))}
      <path
        d="M80 160 L80 145 M80 150 L75 155 M80 150 L85 155"
        className={blossom}
        strokeWidth={2.5}
        fill="none"
      />
      <text
        x={80}
        y={180}
        textAnchor="middle"
        className="fill-[var(--blossom)] text-[11px] font-mono"
      >
        left
      </text>
      <path
        d="M330 160 L330 145 M330 150 L325 155 M330 150 L335 155"
        className="stroke-[var(--sky)]"
        strokeWidth={2.5}
        fill="none"
      />
      <text x={330} y={180} textAnchor="middle" className="fill-[var(--sky)] text-[11px] font-mono">
        right
      </text>
    </Frame>
  );
}

function HashMapSketch() {
  return (
    <Frame label="key → hash → bucket">
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={220}
          y={30 + i * 35}
          width={150}
          height={28}
          rx={6}
          className={sketch}
          strokeWidth={1.8}
        />
      ))}
      {["sora", "kiki", "totoro"].map((k, idx) => (
        <g key={k}>
          <text x={50} y={70 + idx * 40} className="fill-[var(--foreground)] font-mono text-[13px]">
            {k}
          </text>
          <path
            d={`M90 ${66 + idx * 40} Q 160 ${66 + idx * 40} 215 ${44 + idx * 35}`}
            className={sketch}
            strokeWidth={1.5}
            fill="none"
          />
          <text
            x={295}
            y={50 + idx * 35}
            textAnchor="middle"
            className="fill-[var(--foreground)] font-mono text-[12px]"
          >
            {["12", "13", "1000"][idx]}
          </text>
        </g>
      ))}
    </Frame>
  );
}

function LinkedListSketch() {
  return (
    <Frame label="Nodes scattered in memory, linked by references">
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x={20 + i * 95}
            y={85}
            width={70}
            height={50}
            rx={10}
            className={sketch}
            strokeWidth={2}
          />
          <text
            x={55 + i * 95}
            y={117}
            textAnchor="middle"
            className="fill-[var(--foreground)] font-mono text-[14px]"
          >
            {[7, 3, 9, 1][i]}
          </text>
          {i < 3 && (
            <path
              d={`M${90 + i * 95} 110 L${110 + i * 95} 110 M${105 + i * 95} 105 L${112 + i * 95} 110 L${105 + i * 95} 115`}
              className={blossom}
              strokeWidth={2}
              fill="none"
            />
          )}
        </g>
      ))}
      <text
        x={395}
        y={113}
        textAnchor="end"
        className="fill-[var(--muted-foreground)] text-[12px] font-mono"
      >
        → null
      </text>
    </Frame>
  );
}

function StackSketch() {
  return (
    <Frame label="Last-in, first-out — push on top, pop from top">
      {["A", "B", "C", "D"].map((c, i) => (
        <rect
          key={c}
          x={150}
          y={170 - i * 35}
          width={100}
          height={30}
          rx={6}
          className={sketch}
          strokeWidth={2}
        />
      ))}
      {["A", "B", "C", "D"].map((c, i) => (
        <text
          key={c}
          x={200}
          y={190 - i * 35}
          textAnchor="middle"
          className="fill-[var(--foreground)] font-mono text-[14px]"
        >
          {c}
        </text>
      ))}
      <path
        d="M270 50 L270 35 M270 40 L265 45 M270 40 L275 45"
        className={blossom}
        strokeWidth={2.5}
        fill="none"
      />
      <text x={290} y={45} className="fill-[var(--blossom)] text-[11px] font-mono">
        push/pop
      </text>
    </Frame>
  );
}

function QueueSketch() {
  return (
    <Frame label="First-in, first-out — enqueue right, dequeue left">
      {["A", "B", "C", "D", "E"].map((c, i) => (
        <g key={c}>
          <rect
            x={50 + i * 60}
            y={85}
            width={50}
            height={50}
            rx={8}
            className={sketch}
            strokeWidth={2}
          />
          <text
            x={75 + i * 60}
            y={117}
            textAnchor="middle"
            className="fill-[var(--foreground)] font-mono text-[14px]"
          >
            {c}
          </text>
        </g>
      ))}
      <text
        x={75}
        y={170}
        textAnchor="middle"
        className="fill-[var(--blossom)] text-[11px] font-mono"
      >
        dequeue ←
      </text>
      <text x={325} y={170} textAnchor="middle" className="fill-[var(--sky)] text-[11px] font-mono">
        → enqueue
      </text>
    </Frame>
  );
}

function BinarySearchSketch() {
  return (
    <Frame label="Each step halves the search space">
      {[1, 3, 5, 7, 9, 11, 13, 15, 17].map((v, i) => (
        <g key={v}>
          <rect
            x={20 + i * 42}
            y={90}
            width={38}
            height={40}
            rx={6}
            className={i === 4 ? `${sketch}` : "stroke-[var(--border)] fill-none"}
            strokeWidth={i === 4 ? 3 : 1.5}
          />
          <text
            x={39 + i * 42}
            y={116}
            textAnchor="middle"
            className={`font-mono text-[12px] ${i === 4 ? "fill-[var(--lantern)]" : "fill-[var(--muted-foreground)]"}`}
          >
            {v}
          </text>
        </g>
      ))}
      <text
        x={200}
        y={160}
        textAnchor="middle"
        className="fill-[var(--lantern)] text-[12px] font-mono"
      >
        mid
      </text>
      <path
        d="M200 145 L200 135 M200 140 L195 145 M200 140 L205 145"
        className="stroke-[var(--lantern)]"
        strokeWidth={2}
        fill="none"
      />
    </Frame>
  );
}

function SlidingWindowSketch() {
  return (
    <Frame label="A window of size k glides over the array">
      {[2, 7, 3, 8, 4, 1, 9, 5].map((v, i) => (
        <g key={i}>
          <rect
            x={20 + i * 46}
            y={80}
            width={42}
            height={50}
            rx={6}
            className={
              i >= 2 && i <= 4 ? "stroke-[var(--blossom)] fill-[var(--blossom)]/10" : sketch
            }
            strokeWidth={2}
          />
          <text
            x={41 + i * 46}
            y={111}
            textAnchor="middle"
            className="fill-[var(--foreground)] font-mono text-[13px]"
          >
            {v}
          </text>
        </g>
      ))}
      <text
        x={155}
        y={160}
        textAnchor="middle"
        className="fill-[var(--blossom)] text-[11px] font-mono"
      >
        window (k=3)
      </text>
    </Frame>
  );
}

function SortSketch() {
  const heights = [40, 60, 30, 80, 50, 70, 45];
  return (
    <Frame label="Sorting rearranges bars by height">
      {heights.map((h, i) => (
        <rect
          key={i}
          x={30 + i * 50}
          y={170 - h}
          width={36}
          height={h}
          rx={4}
          className={moss}
          opacity={0.8}
        />
      ))}
    </Frame>
  );
}

function RecursionSketch() {
  return (
    <Frame label="Each call spawns a smaller call — until the base case">
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle
            cx={70 + i * 65}
            cy={110}
            r={22 - i * 2}
            className={sketch}
            strokeWidth={2}
            fill="none"
          />
          <text
            x={70 + i * 65}
            y={114}
            textAnchor="middle"
            className="fill-[var(--foreground)] font-mono text-[11px]"
          >
            f({5 - i})
          </text>
          {i < 4 && (
            <path
              d={`M${92 + i * 65} 110 L${127 + i * 65} 110 M${120 + i * 65} 105 L${130 + i * 65} 110 L${120 + i * 65} 115`}
              className={blossom}
              strokeWidth={1.8}
              fill="none"
            />
          )}
        </g>
      ))}
    </Frame>
  );
}

function MatrixSketch() {
  return (
    <Frame label="Row-major 2D grid: m[r][c]">
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <g key={`${r}-${c}`}>
            <rect
              x={80 + c * 45}
              y={40 + r * 38}
              width={42}
              height={36}
              rx={4}
              className={sketch}
              strokeWidth={1.5}
            />
            <text
              x={101 + c * 45}
              y={62 + r * 38}
              textAnchor="middle"
              className="fill-[var(--muted-foreground)] font-mono text-[10px]"
            >
              {r},{c}
            </text>
          </g>
        )),
      )}
    </Frame>
  );
}

function TreeSketch() {
  const nodes = [
    { x: 200, y: 40, v: 8 },
    { x: 130, y: 105, v: 3 },
    { x: 270, y: 105, v: 12 },
    { x: 90, y: 170, v: 1 },
    { x: 170, y: 170, v: 5 },
    { x: 230, y: 170, v: 10 },
    { x: 310, y: 170, v: 15 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [2, 6],
  ];
  return (
    <Frame label="Binary search tree — left smaller, right larger">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          className="stroke-[var(--border)]"
          strokeWidth={2}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={20} className={sketch} strokeWidth={2} fill="var(--card)" />
          <text
            x={n.x}
            y={n.y + 5}
            textAnchor="middle"
            className="fill-[var(--foreground)] font-mono text-[12px]"
          >
            {n.v}
          </text>
        </g>
      ))}
    </Frame>
  );
}

function GraphSketch() {
  const nodes = [
    { x: 80, y: 70, v: "A" },
    { x: 200, y: 50, v: "B" },
    { x: 320, y: 80, v: "C" },
    { x: 120, y: 170, v: "D" },
    { x: 280, y: 170, v: "E" },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [2, 4],
    [1, 4],
  ];
  return (
    <Frame label="Undirected graph — adjacency dict in Python">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          className="stroke-[var(--border)]"
          strokeWidth={2}
        />
      ))}
      {nodes.map((n) => (
        <g key={n.v}>
          <circle
            cx={n.x}
            cy={n.y}
            r={22}
            className="fill-[var(--card)] stroke-[var(--blossom)]"
            strokeWidth={2}
          />
          <text
            x={n.x}
            y={n.y + 5}
            textAnchor="middle"
            className="fill-[var(--foreground)] font-mono text-[13px]"
          >
            {n.v}
          </text>
        </g>
      ))}
    </Frame>
  );
}

function HeapSketch() {
  const nodes = [
    { x: 200, y: 40, v: 1 },
    { x: 130, y: 105, v: 3 },
    { x: 270, y: 105, v: 2 },
    { x: 90, y: 170, v: 7 },
    { x: 170, y: 170, v: 5 },
    { x: 230, y: 170, v: 4 },
    { x: 310, y: 170, v: 9 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [2, 6],
  ];
  return (
    <Frame label="Min-heap — parent ≤ children, smallest at root">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          className="stroke-[var(--border)]"
          strokeWidth={2}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r={20}
            className={`${sketch} fill-[var(--card)]`}
            strokeWidth={2}
          />
          <text
            x={n.x}
            y={n.y + 5}
            textAnchor="middle"
            className="fill-[var(--foreground)] font-mono text-[12px]"
          >
            {n.v}
          </text>
        </g>
      ))}
    </Frame>
  );
}

function BitsSketch() {
  const bits = ["1", "0", "1", "1", "0", "1", "0", "1"];
  return (
    <Frame label="Bits — the alphabet of the machine">
      {bits.map((b, i) => (
        <g key={i}>
          <rect
            x={40 + i * 42}
            y={80}
            width={36}
            height={60}
            rx={4}
            className={
              b === "1"
                ? "fill-[var(--lantern)]/30 stroke-[var(--lantern)]"
                : "stroke-[var(--border)] fill-none"
            }
            strokeWidth={2}
          />
          <text
            x={58 + i * 42}
            y={117}
            textAnchor="middle"
            className="fill-[var(--foreground)] font-mono text-[16px]"
          >
            {b}
          </text>
          <text
            x={58 + i * 42}
            y={160}
            textAnchor="middle"
            className="fill-[var(--muted-foreground)] font-mono text-[10px]"
          >
            {1 << (7 - i)}
          </text>
        </g>
      ))}
    </Frame>
  );
}
