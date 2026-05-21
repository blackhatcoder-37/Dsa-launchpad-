export type Module = {
  day: number;
  phase: string;
  title: string;
  tagline: string;
  theory: string;
  code: string;
  leetcode: { id: string; title: string; url: string };
};

export const phases = [
  { name: "Foundations of Memory & Complexity", days: [1, 2, 3, 4, 5], color: "lantern" },
  { name: "Linear Structures & Search", days: [6, 7, 8, 9, 10], color: "sky" },
  { name: "Recursion & Advanced Sorting", days: [11, 12, 13, 14, 15], color: "blossom" },
  { name: "Trees, Graphs & Traversal", days: [16, 17, 18, 19, 20], color: "moss" },
  { name: "Optimization & Capstone", days: [21, 22, 23, 24, 25], color: "lantern" },
] as const;

export const modules: Module[] = [
  {
    day: 1,
    phase: "Foundations",
    title: "RAM, Pointers, and Big-O Demystified",
    tagline: "How a computer truly remembers things.",
    theory:
      "Imagine your computer's memory as a long shelf of tiny labeled cubbies — billions of them. When you write `x = 5`, Python politely asks the operating system for one cubby, writes the number 5 inside, and hands you back a label (a memory address) so you can find it again later. That label is what we call a pointer. Big-O is our gentle way of describing how much extra work a program needs when its input grows. O(1) is a one-step glance at a single cubby. O(n) is a stroll past every cubby on the shelf. O(n²) is checking every pair — which gets very tiring very quickly.",
    code: `# O(1) — a single dictionary lookup
ages = {"sora": 12, "kiki": 13, "totoro": 1000}
print(ages["totoro"])  # one step, no matter how many entries

# O(n^2) — nested loop searching an array
def has_duplicate(nums):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] == nums[j]:
                return True
    return False`,
    leetcode: { id: "217", title: "Contains Duplicate", url: "https://leetcode.com/problems/contains-duplicate/" },
  },
  {
    day: 2,
    phase: "Foundations",
    title: "Dynamic Arrays & Memory Over-allocation",
    tagline: "Why Python lists never seem to run out of room.",
    theory:
      "A Python list is a clever, growing shelf. When it fills up, Python quietly builds a bigger shelf in the background, copies everything over, and throws away the old one. Because it reserves a bit of extra space each time, most `.append()` calls feel instant — this is called amortized O(1). Index lookups like `arr[7]` are pure O(1) magic because Python knows exactly which cubby to peek into.",
    code: `class StaticArray:
    def __init__(self, capacity):
        self.capacity = capacity
        self.size = 0
        self.data = [None] * capacity

    def append(self, value):
        if self.size == self.capacity:
            raise OverflowError("the little shelf is full!")
        self.data[self.size] = value
        self.size += 1

    def __getitem__(self, i):  # O(1)
        return self.data[i]`,
    leetcode: { id: "1", title: "Two Sum", url: "https://leetcode.com/problems/two-sum/" },
  },
  {
    day: 3,
    phase: "Foundations",
    title: "String Mechanics & Two Pointers",
    tagline: "Whispering from both ends at once.",
    theory:
      "Strings in Python are immutable — every '+' between strings secretly creates a brand-new string and tosses the old one to the garbage collector. The two-pointer pattern lets us walk inward from both ends of a sequence, doing work in one tidy pass without using extra memory.",
    code: `def reverse_in_place(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr`,
    leetcode: { id: "125", title: "Valid Palindrome", url: "https://leetcode.com/problems/valid-palindrome/" },
  },
  {
    day: 4,
    phase: "Foundations",
    title: "Hash Maps & Sets",
    tagline: "The powerhouse you'll reach for again and again.",
    theory:
      "A hash map turns a key into a number, and that number tells it which cubby to look in. When two keys land in the same cubby (a collision), the structure has a polite little plan to handle it. The reward: average O(1) lookups, insertions, and deletions. In Python, this is your everyday `dict` and `set`.",
    code: `def frequency(text):
    counts = {}
    for ch in text:
        counts[ch] = counts.get(ch, 0) + 1
    return counts

print(frequency("ghibli"))`,
    leetcode: { id: "242", title: "Valid Anagram", url: "https://leetcode.com/problems/valid-anagram/" },
  },
  {
    day: 5,
    phase: "Foundations",
    title: "Linked Lists — The Anatomy of a Node",
    tagline: "Stones along a forest path, each pointing to the next.",
    theory:
      "Instead of one contiguous shelf, a linked list is a chain of little nodes scattered through memory. Each node holds a value and a reference to the next one. We give up O(1) random access — but we gain effortless insertions and deletions at the front.",
    code: `class Node:
    def __init__(self, value, nxt=None):
        self.value = value
        self.next = nxt

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, value):
        if not self.head:
            self.head = Node(value); return
        cur = self.head
        while cur.next: cur = cur.next
        cur.next = Node(value)

    def display(self):
        cur, out = self.head, []
        while cur: out.append(cur.value); cur = cur.next
        return out`,
    leetcode: { id: "206", title: "Reverse Linked List", url: "https://leetcode.com/problems/reverse-linked-list/" },
  },
  {
    day: 6,
    phase: "Linear",
    title: "Stacks (LIFO) & Call Stacks",
    tagline: "Last in, first out — like stacking plates.",
    theory:
      "A stack only lets you touch the top. Push to add, pop to remove. Your computer uses one internally to keep track of nested function calls — every `return` pops the current call off and resumes the one beneath it.",
    code: `stack = []
stack.append("a")
stack.append("b")
print(stack.pop())  # "b"`,
    leetcode: { id: "20", title: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses/" },
  },
  {
    day: 7,
    phase: "Linear",
    title: "Queues (FIFO) & Deques",
    tagline: "First in, first out — like a polite line at the bakery.",
    theory:
      "Python lists make terrible queues — `.pop(0)` shifts every remaining element (O(n))! `collections.deque` solves this with true O(1) pops from both ends.",
    code: `from collections import deque
q = deque()
q.append("a"); q.append("b")
print(q.popleft())  # "a"`,
    leetcode: { id: "225", title: "Implement Stack using Queues", url: "https://leetcode.com/problems/implement-stack-using-queues/" },
  },
  {
    day: 8,
    phase: "Linear",
    title: "Linear vs Binary Search",
    tagline: "Half the haystack with every glance.",
    theory:
      "On a sorted array, binary search halves the search space each step — turning O(n) into O(log n). The data being sorted is what unlocks the speed.",
    code: `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target: return mid
        if arr[mid] < target: lo = mid + 1
        else: hi = mid - 1
    return -1`,
    leetcode: { id: "704", title: "Binary Search", url: "https://leetcode.com/problems/binary-search/" },
  },
  {
    day: 9,
    phase: "Linear",
    title: "The Sliding Window",
    tagline: "A window that glides instead of starting over.",
    theory:
      "Rather than recomputing a sum or count for every subarray from scratch, slide the window: add the new element, remove the old. O(n²) becomes O(n).",
    code: `def max_sum_window(arr, k):
    s = sum(arr[:k]); best = s
    for i in range(k, len(arr)):
        s += arr[i] - arr[i - k]
        best = max(best, s)
    return best`,
    leetcode: { id: "121", title: "Best Time to Buy and Sell Stock", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
  },
  {
    day: 10,
    phase: "Linear",
    title: "Sorting Fundamentals",
    tagline: "Bubble, Insertion, and Selection — the friendly trio.",
    theory:
      "These O(n²) sorts aren't fast, but their mechanics teach you the language of swaps, passes, and invariants — vocabulary you'll need for everything sortier that comes next.",
    code: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key, j = arr[i], i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]; j -= 1
        arr[j + 1] = key
    return arr`,
    leetcode: { id: "912", title: "Sort an Array", url: "https://leetcode.com/problems/sort-an-array/" },
  },
  {
    day: 11,
    phase: "Recursion",
    title: "The Mechanics of Recursion",
    tagline: "A function that politely asks itself for help.",
    theory:
      "Recursion solves a problem by solving a smaller version of itself. Every recursion needs a base case — without one, you'll keep stacking calls until Python throws a RecursionError.",
    code: `def factorial(n):
    if n <= 1: return 1     # base case
    return n * factorial(n - 1)

def fib(n):
    if n < 2: return n
    return fib(n - 1) + fib(n - 2)`,
    leetcode: { id: "509", title: "Fibonacci Number", url: "https://leetcode.com/problems/fibonacci-number/" },
  },
  {
    day: 12,
    phase: "Recursion",
    title: "Merge Sort",
    tagline: "Divide, conquer, and weave back together.",
    theory:
      "Split the array in half, recursively sort each half, then merge the two sorted halves in linear time. Guaranteed O(n log n) — every time.",
    code: `def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(a, b):
    out, i, j = [], 0, 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]: out.append(a[i]); i += 1
        else: out.append(b[j]); j += 1
    return out + a[i:] + b[j:]`,
    leetcode: { id: "88", title: "Merge Sorted Array", url: "https://leetcode.com/problems/merge-sorted-array/" },
  },
  {
    day: 13,
    phase: "Recursion",
    title: "Quick Sort",
    tagline: "Pick a pivot, rearrange the world around it.",
    theory:
      "Choose a pivot, move everything smaller to its left and everything larger to its right, then recurse. Average O(n log n), worst-case O(n²) on already-sorted input.",
    code: `def quick_sort(arr, lo=0, hi=None):
    if hi is None: hi = len(arr) - 1
    if lo < hi:
        p = partition(arr, lo, hi)
        quick_sort(arr, lo, p - 1)
        quick_sort(arr, p + 1, hi)
    return arr

def partition(arr, lo, hi):
    pivot = arr[hi]; i = lo - 1
    for j in range(lo, hi):
        if arr[j] <= pivot:
            i += 1; arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[hi] = arr[hi], arr[i + 1]
    return i + 1`,
    leetcode: { id: "215", title: "Kth Largest Element in an Array", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
  },
  {
    day: 14,
    phase: "Recursion",
    title: "Matrix & 2D Array Traversal",
    tagline: "Grids, coordinates, and tidy rows.",
    theory:
      "A 2D array is really a list of lists. Row-major ordering means rows live next to each other in memory. We address cells with (row, col) and walk neighbors with offsets.",
    code: `def transpose(m):
    rows, cols = len(m), len(m[0])
    return [[m[r][c] for r in range(rows)] for c in range(cols)]`,
    leetcode: { id: "73", title: "Set Matrix Zeroes", url: "https://leetcode.com/problems/set-matrix-zeroes/" },
  },
  {
    day: 15,
    phase: "Recursion",
    title: "Mid-Way Milestone & Hack Session",
    tagline: "Catch your breath, then build something tiny.",
    theory:
      "Today we look back at everything from arrays to recursion and ask the most useful DSA question of all: 'which structure fits this shape of problem?'",
    code: `class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.store = {}

    def get(self, key):
        if key not in self.store: return -1
        value = self.store.pop(key); self.store[key] = value
        return value

    def put(self, key, value):
        if key in self.store: self.store.pop(key)
        elif len(self.store) >= self.cap:
            oldest = next(iter(self.store)); self.store.pop(oldest)
        self.store[key] = value`,
    leetcode: { id: "387", title: "First Unique Character in a String", url: "https://leetcode.com/problems/first-unique-character-in-a-string/" },
  },
  {
    day: 16,
    phase: "Trees",
    title: "Binary Trees & BSTs",
    tagline: "From straight lines to branching paths.",
    theory:
      "A binary tree gives each node up to two children. A Binary Search Tree adds a beautiful rule: every left child is smaller, every right child is larger. That ordering is what makes searching feel like binary search again.",
    code: `class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def insert(root, val):
    if not root: return TreeNode(val)
    if val < root.val: root.left = insert(root.left, val)
    else: root.right = insert(root.right, val)
    return root`,
    leetcode: { id: "700", title: "Search in a Binary Search Tree", url: "https://leetcode.com/problems/search-in-a-binary-search-tree/" },
  },
  {
    day: 17,
    phase: "Trees",
    title: "Tree Traversals (DFS)",
    tagline: "In-order, Pre-order, Post-order.",
    theory:
      "DFS walks deep first. The order we visit the node relative to its children gives three flavors with very different uses — in-order on a BST yields sorted values; post-order is perfect for cleaning up.",
    code: `def inorder(node, out):
    if not node: return
    inorder(node.left, out); out.append(node.val); inorder(node.right, out)`,
    leetcode: { id: "94", title: "Binary Tree Inorder Traversal", url: "https://leetcode.com/problems/binary-tree-inorder-traversal/" },
  },
  {
    day: 18,
    phase: "Trees",
    title: "Breadth-First Search",
    tagline: "Layer by layer, from the root downward.",
    theory:
      "BFS uses a FIFO queue to visit every node at depth d before any node at depth d+1. It's how we find the shortest path in an unweighted graph.",
    code: `from collections import deque
def level_order(root):
    if not root: return []
    out, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            n = q.popleft(); level.append(n.val)
            if n.left: q.append(n.left)
            if n.right: q.append(n.right)
        out.append(level)
    return out`,
    leetcode: { id: "102", title: "Binary Tree Level Order Traversal", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
  },
  {
    day: 19,
    phase: "Trees",
    title: "Graphs & Adjacency Lists",
    tagline: "Networks of relationships.",
    theory:
      "Graphs are nodes (vertices) connected by edges. The cheapest representation is an adjacency list — a dict where each key maps to the list of its neighbors.",
    code: `graph = {
  "A": ["B", "C"],
  "B": ["A", "D"],
  "C": ["A", "D"],
  "D": ["B", "C"],
}`,
    leetcode: { id: "1971", title: "Find if Path Exists in Graph", url: "https://leetcode.com/problems/find-if-path-exists-in-graph/" },
  },
  {
    day: 20,
    phase: "Trees",
    title: "Graph Traversals (DFS & BFS)",
    tagline: "Visited sets save you from infinite loops.",
    theory:
      "Graphs can have cycles, so unlike trees we must remember where we've been. Keep a `visited` set and never revisit a node.",
    code: `def bfs(graph, start):
    from collections import deque
    visited, q = {start}, deque([start])
    order = []
    while q:
        node = q.popleft(); order.append(node)
        for nei in graph[node]:
            if nei not in visited:
                visited.add(nei); q.append(nei)
    return order`,
    leetcode: { id: "200", title: "Number of Islands", url: "https://leetcode.com/problems/number-of-islands/" },
  },
  {
    day: 21,
    phase: "Optimization",
    title: "Heaps & Priority Queues",
    tagline: "Always reach for the smallest (or largest) first.",
    theory:
      "A heap is a tree shaped like a complete binary tree, where every parent is ≤ (min-heap) or ≥ (max-heap) its children. Python's `heapq` module gives you a min-heap for free.",
    code: `import heapq
h = []
heapq.heappush(h, 5); heapq.heappush(h, 1); heapq.heappush(h, 3)
print(heapq.heappop(h))  # 1`,
    leetcode: { id: "1046", title: "Last Stone Weight", url: "https://leetcode.com/problems/last-stone-weight/" },
  },
  {
    day: 22,
    phase: "Optimization",
    title: "Greedy Algorithmic Thinking",
    tagline: "Pick the best-looking step right now.",
    theory:
      "Greedy algorithms make the locally optimal choice at each step, hoping it leads to a globally optimal answer. When it works, it's elegant and fast.",
    code: `def max_subarray(nums):
    best = cur = nums[0]
    for x in nums[1:]:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best`,
    leetcode: { id: "53", title: "Maximum Subarray", url: "https://leetcode.com/problems/maximum-subarray/" },
  },
  {
    day: 23,
    phase: "Optimization",
    title: "Dynamic Programming (Memoization)",
    tagline: "Never solve the same problem twice.",
    theory:
      "DP is recursion plus a notebook. Whenever you compute an answer, you jot it down so you can read it back instantly the next time it shows up.",
    code: `def fib(n, memo=None):
    memo = memo or {}
    if n in memo: return memo[n]
    if n < 2: return n
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]`,
    leetcode: { id: "70", title: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/" },
  },
  {
    day: 24,
    phase: "Optimization",
    title: "Bit Manipulation for Beginners",
    tagline: "Speaking directly to the ones and zeros.",
    theory:
      "Numbers are just bits. AND, OR, XOR, and shifts let you flip, mask, and test those bits in single instructions — often turning slow logic into one line.",
    code: `def is_odd(x): return x & 1 == 1
def single_number(nums):
    out = 0
    for x in nums: out ^= x
    return out`,
    leetcode: { id: "136", title: "Single Number", url: "https://leetcode.com/problems/single-number/" },
  },
  {
    day: 25,
    phase: "Optimization",
    title: "Portfolio Showcase Day",
    tagline: "Polish, present, and celebrate.",
    theory:
      "You've earned this day. We tidy the code, write the README, push to GitHub, and demo the capstone projects you built along the way.",
    code: `def reverse_string(s):
    s.reverse()
    return s`,
    leetcode: { id: "344", title: "Reverse String", url: "https://leetcode.com/problems/reverse-string/" },
  },
];

export type Capstone = {
  slug: string;
  title: string;
  pitch: string;
  description: string;
  structures: string[];
  steps: string[];
  emoji: string;
};

export const capstones: Capstone[] = [
  {
    slug: "spotify-clone-graph",
    title: "Mixtape Graph",
    pitch: "A friendship-aware song recommender.",
    description:
      "Build a tiny Spotify-like recommender that suggests songs based on what your friends and friends-of-friends are listening to. The whole social network is a graph; recommendations are a BFS away.",
    structures: ["Graph (adjacency list)", "Hash Map", "Queue", "Heap"],
    steps: [
      "Model users and songs as nodes; friendships and 'liked' relations as edges.",
      "Load a tiny seed dataset (CSV or JSON) into Python dictionaries.",
      "Use BFS from a user to collect candidate songs within k hops.",
      "Score candidates with a heap to surface the top 10.",
      "Wrap it in a CLI: `python mixtape.py --user kiki --top 10`.",
    ],
    emoji: "🎵",
  },
  {
    slug: "smart-todo-trie",
    title: "Whispering Todo",
    pitch: "An autocompleting task tracker.",
    description:
      "A terminal todo app that autocompletes task names as you type, using a Trie. Bonus: deadlines stored in a min-heap so you always see the next thing due.",
    structures: ["Trie", "Min-Heap", "Hash Map"],
    steps: [
      "Implement a Trie with insert/search/starts_with.",
      "Persist tasks to a JSON file on disk.",
      "Use heapq to maintain tasks ordered by deadline.",
      "Hook up Python's `input()` with a prefix-suggestion loop.",
      "Add tags and filter using set intersections.",
    ],
    emoji: "📝",
  },
  {
    slug: "maze-solver",
    title: "Forest Maze Solver",
    pitch: "Visualize BFS and DFS finding a path.",
    description:
      "Generate a random maze, then watch BFS and DFS race to find the exit. Renders to the terminal with cozy ASCII art — perfect for understanding why BFS finds shortest paths.",
    structures: ["2D Grid", "Queue (BFS)", "Stack (DFS)", "Set (visited)"],
    steps: [
      "Generate a random maze with recursive backtracking.",
      "Implement BFS to find shortest path; mark with `·`.",
      "Implement DFS for comparison; mark with `*`.",
      "Animate each step using `time.sleep` and screen clears.",
      "Save the solved maze to a text file.",
    ],
    emoji: "🌲",
  },
  {
    slug: "leaderboard-heap",
    title: "Live Leaderboard",
    pitch: "Real-time scores with O(log n) updates.",
    description:
      "A simulated game leaderboard where scores arrive every few seconds and the top-10 must always be fresh. A perfect home for a max-heap.",
    structures: ["Max-Heap", "Hash Map", "Doubly Linked List"],
    steps: [
      "Stream events from a JSON file or random generator.",
      "Maintain a max-heap of (score, player) tuples.",
      "Use a dict to deduplicate players and update existing scores.",
      "Render the top 10 every second with `rich` or plain print.",
      "Persist the all-time high to disk.",
    ],
    emoji: "🏆",
  },
  {
    slug: "url-shortener",
    title: "Tiny Lantern URL",
    pitch: "Hash-map powered bit.ly clone.",
    description:
      "A minimal URL shortener using a Flask backend, base62 encoding, and a hash map for O(1) redirects. The perfect 'I built that!' project for any portfolio.",
    structures: ["Hash Map", "String Encoding", "Counter"],
    steps: [
      "Spin up a Flask app with `/` and `/<code>` routes.",
      "Implement base62 encode/decode of an integer counter.",
      "Store short→long mappings in a SQLite-backed dict.",
      "Add a click-count hash map per short code.",
      "Deploy to a free host and share the link with friends.",
    ],
    emoji: "🔗",
  },
];
