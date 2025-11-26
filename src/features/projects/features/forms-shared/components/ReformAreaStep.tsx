import {
  Home,
  Utensils,
  Bath,
  Droplets,
  DoorOpen,
  Warehouse,
  Fence,
  Trees,
  Wind,
  Sparkles,
  ArrowUpDown,
  MoreHorizontal,
  Flame,
  Square,
  Layers,
  ChevronUp,
  Building2,
  Shuffle,
  Shield,
  Snowflake,
  Wrench,
} from 'lucide-react';
import { useFormContext } from '../../hearing-form/context/FormContext';
import { ReformArea } from '../../hearing-form/types';

export const ReformAreaStep = () => {
  const { data, toggleReformArea } = useFormContext();

  const areaGroups = [
    {
      title: '全体',
      areas: [
        { value: 'whole' as ReformArea, label: '家全体', icon: Home },
      ],
    },
    {
      title: '水まわり',
      areas: [
        { value: 'kitchen' as ReformArea, label: 'キッチン', icon: Utensils },
        { value: 'toilet' as ReformArea, label: 'トイレ', icon: DoorOpen },
        { value: 'bathroom' as ReformArea, label: '浴室・バス', icon: Bath },
        { value: 'washroom' as ReformArea, label: '洗面', icon: Droplets },
        { value: 'water-heater' as ReformArea, label: '給湯器', icon: Flame },
      ],
    },
    {
      title: '内装',
      areas: [
        { value: 'interior-wall' as ReformArea, label: '壁', icon: Square },
        { value: 'interior-floor' as ReformArea, label: '床', icon: Layers },
        { value: 'interior-ceiling' as ReformArea, label: '天井', icon: ChevronUp },
      ],
    },
    {
      title: '外まわり',
      areas: [
        { value: 'exterior' as ReformArea, label: '外壁', icon: Warehouse },
        { value: 'roof' as ReformArea, label: '屋根', icon: Home },
        { value: 'exterior-structure' as ReformArea, label: '外構・エクステリア', icon: Building2 },
        { value: 'balcony-veranda' as ReformArea, label: 'バルコニー・ベランダ', icon: Fence },
        { value: 'garden' as ReformArea, label: '庭・ガーデニング', icon: Trees },
      ],
    },
    {
      title: 'その他',
      areas: [
        { value: 'entrance' as ReformArea, label: '玄関', icon: DoorOpen },
        { value: 'window' as ReformArea, label: '窓・サッシ', icon: Wind },
        { value: 'hallway' as ReformArea, label: '階段', icon: ArrowUpDown },
        { value: 'stairs' as ReformArea, label: '廊下', icon: Sparkles },
        { value: 'storage' as ReformArea, label: '収納', icon: Warehouse },
        { value: 'layout-change' as ReformArea, label: '間取変更', icon: Shuffle },
        { value: 'seismic' as ReformArea, label: '耐震', icon: Shield },
        { value: 'insulation' as ReformArea, label: '断熱', icon: Snowflake },
        { value: 'plumbing' as ReformArea, label: '配管', icon: Wrench },
        { value: 'other' as ReformArea, label: 'その他', icon: MoreHorizontal },
      ],
    },
  ];

  const isSelected = (area: ReformArea) => data.reformAreas.includes(area);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-orange-500">リフォーム検討箇所</span>をお選びください
          <span className="text-sm text-gray-500 ml-2">(複数選択可)</span>
        </h2>
        <div className="space-y-2 text-gray-600">
          <p>一度選んだリフォーム箇所は、もう一度クリックするとキャンセルできます。</p>
          <p className="text-sm">
            箇所が多い全体のリフォームは「家全体」、<br />
            増築など箇所が選びにくい、まだ決まっていない場合は「その他」を選んでください。
          </p>
          <p className="text-sm text-gray-500">決まったら、下の「次へ」ボタンをクリックしてください。</p>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm">
        <p className="text-gray-700">※リフォーム箇所は複数選択可</p>
      </div>

      <div className="space-y-8">
        {areaGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-lg font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded-lg mb-4">
              {group.title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {group.areas.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => toggleReformArea(value)}
                  className={`relative p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    isSelected(value)
                      ? 'border-orange-500 bg-orange-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  {isSelected(value) && (
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow">
                      {data.reformAreas.indexOf(value) + 1}
                    </div>
                  )}
                  <div className="flex flex-col items-center space-y-3">
                    <Icon
                      className={`w-10 h-10 ${
                        isSelected(value) ? 'text-orange-600' : 'text-gray-600'
                      }`}
                      strokeWidth={1.5}
                    />
                    <span
                      className={`text-sm font-medium text-center ${
                        isSelected(value) ? 'text-orange-600' : 'text-gray-700'
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {data.reformAreas.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-red-600 text-xl font-bold">!</span>
              <span className="text-gray-700">
                箇所が多い全体のリフォームは「家全体」、
              </span>
            </div>
            <p className="text-gray-600">
              増築など箇所が選びにくい、まだ決まっていない場合は「その他」を選んでください。
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
