import styles from './SymptomPage.module.css';

/* ── 앞면 신체 부위 정의 ── */
const FRONT = [
  { id: 'head',      label: '머리·얼굴', shape: 'ellipse', cx: 80, cy: 28, rx: 24, ry: 26 },
  { id: 'throat',    label: '목',       shape: 'rect', x: 66, y: 52,  w: 28, h: 14, rx: 6  },
  { id: 'chest',     label: '가슴',     shape: 'rect', x: 44, y: 64,  w: 72, h: 56, rx: 10 },
  { id: 'abdomen',   label: '복부',     shape: 'rect', x: 46, y: 118, w: 68, h: 38, rx: 8  },
  { id: 'left_arm',  label: '왼팔',     shape: 'rect', x: 14, y: 66,  w: 26, h: 82, rx: 10 },
  { id: 'right_arm', label: '오른팔',   shape: 'rect', x: 120,y: 66,  w: 26, h: 82, rx: 10 },
  { id: 'hip',       label: '허리·골반', shape: 'rect', x: 44, y: 154, w: 72, h: 24, rx: 8  },
  { id: 'left_leg',  label: '왼다리',   shape: 'rect', x: 44, y: 176, w: 32, h: 116,rx: 10 },
  { id: 'right_leg', label: '오른다리', shape: 'rect', x: 84, y: 176, w: 32, h: 116,rx: 10 },
];

/* ── 뒷면 신체 부위 정의 ── */
const BACK = [
  { id: 'head',        label: '뒷머리',     shape: 'ellipse', cx: 80, cy: 28, rx: 24, ry: 26 },
  { id: 'neck_back',   label: '목·어깨',   shape: 'rect', x: 44, y: 52,  w: 72, h: 22, rx: 8  },
  { id: 'upper_back',  label: '등 위',     shape: 'rect', x: 46, y: 72,  w: 68, h: 46, rx: 8  },
  { id: 'lower_back',  label: '허리',      shape: 'rect', x: 46, y: 116, w: 68, h: 40, rx: 8  },
  { id: 'left_arm',    label: '왼팔',      shape: 'rect', x: 14, y: 52,  w: 26, h: 92, rx: 10 },
  { id: 'right_arm',   label: '오른팔',    shape: 'rect', x: 120,y: 52,  w: 26, h: 92, rx: 10 },
  { id: 'hip',         label: '엉덩이·골반', shape: 'rect', x: 44, y: 154, w: 72, h: 24, rx: 8  },
  { id: 'left_leg',    label: '왼다리',    shape: 'rect', x: 44, y: 176, w: 32, h: 116,rx: 10 },
  { id: 'right_leg',   label: '오른다리',  shape: 'rect', x: 84, y: 176, w: 32, h: 116,rx: 10 },
];

export default function BodyDiagram({ front = true, selectedPart, onSelect }) {
  const parts = front ? FRONT : BACK;

  return (
    <svg
      viewBox="0 0 160 300"
      width="160"
      height="300"
      className={styles.bodySvg}
    >
      {parts.map((part) => {
        const active = selectedPart === part.id;
        const fill   = active ? '#2563EB' : '#EFF6FF';
        const stroke = active ? '#1D4ED8' : '#BFDBFE';
        const color  = active ? '#fff'    : '#2563EB';

        /* 텍스트 중심 좌표 */
        const tx = part.shape === 'ellipse' ? part.cx : part.x + part.w / 2;
        const ty = part.shape === 'ellipse' ? part.cy : part.y + part.h / 2;
        const fs = part.h < 20 ? 8 : 8.5;

        return (
          <g
            key={part.id}
            onClick={() => onSelect(part.id)}
            className={styles.bodyPart}
            role="button"
            aria-label={part.label}
          >
            {part.shape === 'ellipse' ? (
              <ellipse
                cx={part.cx} cy={part.cy}
                rx={part.rx} ry={part.ry}
                fill={fill} stroke={stroke} strokeWidth="1.5"
              />
            ) : (
              <rect
                x={part.x} y={part.y}
                width={part.w} height={part.h}
                rx={part.rx}
                fill={fill} stroke={stroke} strokeWidth="1.5"
              />
            )}
            <text
              x={tx} y={ty}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={fs}
              fill={color}
              fontWeight="600"
              fontFamily="'Pretendard', sans-serif"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {part.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
