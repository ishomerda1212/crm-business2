import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { FormContext as HearingFormContext } from '../hearing-form/context/FormContext';
import { FormContext as SimpleFormContext } from '../simple-form/context/FormContext';
import type { PropertyInfo } from '@/lib/supabase';
import { getConstructionAddressesByCustomerName, mockCustomerSearchCandidates } from '@/data/mockData';
import { Home, MapPin } from 'lucide-react';

// 顧客IDから顧客名を取得する関数（暫定的にモックデータを使用）
const getCustomerNameById = (customerId: string): string | null => {
  const candidate = mockCustomerSearchCandidates.find(c => c.id === customerId);
  return candidate?.customerName || null;
};

export const PropertySelectStep = () => {
  // 両方のコンテキストを試す（どちらかが存在するはず）
  const hearingContext = useContext(HearingFormContext);
  const simpleContext = useContext(SimpleFormContext);

  if (!hearingContext && !simpleContext) {
    throw new Error('PropertySelectStep must be used within a form context');
  }

  const [properties, setProperties] = useState<PropertyInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const customerId = hearingContext?.data.selectedCustomerId || simpleContext?.data.selectedCustomerId || null;

  useEffect(() => {
    const loadProperties = async () => {
      if (!customerId) {
        setLoading(false);
        return;
      }

      try {
        // TODO: 実際のAPIから顧客IDで物件一覧を取得
        // 現在はモックデータを使用
        // 顧客IDから顧客名を取得（暫定的にモックデータを使用）
        const customerName = getCustomerNameById(customerId);
        if (customerName) {
          const mockProperties = getConstructionAddressesByCustomerName(customerName);
          setProperties(mockProperties);
        }
      } catch (error) {
        console.error('物件一覧の取得に失敗しました', error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, [customerId]);

  const handleSelectProperty = (propertyId: string) => {
    if (hearingContext) {
      hearingContext.setSelectedPropertyId(propertyId);
    } else if (simpleContext) {
      simpleContext.setSelectedPropertyId(propertyId);
    }
  };

  const selectedPropertyId = hearingContext?.data.selectedPropertyId || simpleContext?.data.selectedPropertyId || null;

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            <span className="text-orange-500">物件を選択</span>してください
          </h2>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            <span className="text-orange-500">物件を選択</span>してください
          </h2>
          <p className="text-gray-600 mb-6">
            このお客様に紐づく物件が見つかりませんでした。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-orange-500">物件を選択</span>してください
        </h2>
        <p className="text-gray-600">
          どの物件の工事についてお問い合わせですか？
        </p>
      </div>

      <div className="grid gap-4">
        {properties.map((property) => {
          const isSelected = property.id === selectedPropertyId;
          return (
            <button
              key={property.id}
              onClick={() => handleSelectProperty(property.id)}
              className={`group relative p-6 rounded-2xl border-2 bg-white transition-all duration-200 hover:shadow-lg text-left ${
                isSelected
                  ? 'border-orange-500 bg-orange-50 shadow-md'
                  : 'border-gray-200 hover:border-orange-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-orange-100 group-hover:text-orange-600'
                  }`}
                >
                  <Home className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {property.property_name || '物件名未設定'}
                    </h3>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600">
                        選択中
                      </span>
                    )}
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      {property.construction_prefecture && property.construction_address ? (
                        <p>
                          {property.construction_prefecture}
                          {property.construction_address}
                        </p>
                      ) : property.address ? (
                        <p>{property.address}</p>
                      ) : (
                        <p className="text-gray-400">住所情報がありません</p>
                      )}
                    </div>
                  </div>
                  {property.construction_structure && (
                    <p className="text-sm text-gray-500">
                      構造: {property.construction_structure}
                      {property.construction_layout && ` / ${property.construction_layout}`}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

