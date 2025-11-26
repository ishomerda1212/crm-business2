import { Mail, Phone, Lock } from 'lucide-react';
import { useFormContext } from '../../hearing-form/context/FormContext';
import { RegistrationType } from '../../hearing-form/types';

export const AccountStep = () => {
  const {
    data,
    setRegistrationType,
    setRegistrationEmail,
    setRegistrationPhone,
    setLoginEmail,
    setLoginPassword,
  } = useFormContext();

  const handleTypeChange = (type: RegistrationType) => {
    if (type === data.registrationType) return;
    setRegistrationType(type);
    if (type === 'new') {
      setLoginEmail('');
      setLoginPassword('');
    } else {
      setRegistrationEmail('');
      setRegistrationPhone('');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <span className="text-orange-500">会員情報</span>を入力・確認してください
        </h2>
        <p className="text-gray-600">
          新規ご登録の方はメールアドレスと携帯電話番号をご入力ください。既に会員の方はログイン情報をご入力ください。
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <button
          onClick={() => handleTypeChange('new')}
          className={`flex-1 px-6 py-4 rounded-xl border-2 font-semibold transition-all duration-200 ${
            data.registrationType === 'new'
              ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-md'
              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm'
          }`}
        >
          新規登録
        </button>
        <button
          onClick={() => handleTypeChange('existing')}
          className={`flex-1 px-6 py-4 rounded-xl border-2 font-semibold transition-all duration-200 ${
            data.registrationType === 'existing'
              ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-md'
              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-sm'
          }`}
        >
          会員ログイン
        </button>
      </div>

      {data.registrationType === 'new' ? (
        <div className="space-y-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg text-sm text-gray-700">
            <p>※メールアドレスは会員ページのログインIDになります。</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">必須</span>
                メールアドレス
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={data.registrationEmail}
                  onChange={(e) => setRegistrationEmail(e.target.value)}
                  placeholder="例）example@example.com"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-gray-700"
                />
              </div>
              <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
                <p className="font-semibold mb-2">メールアドレスはフリーメールを推奨しております。</p>
                <div className="space-y-1 text-xs">
                  <p className="flex items-center">
                    <span className="text-green-600 font-bold mr-2">〇</span>
                    <span>フリーメール（例：Gmail、Yahoo!メール、Outlookなど）</span>
                  </p>
                  <p className="flex items-center">
                    <span className="text-orange-600 font-bold mr-2">△</span>
                    <span>キャリアメール（例：docomo.ne.jp、au.com、softbank.ne.jpなど）</span>
                  </p>
                </div>
                <p className="mt-2 text-xs text-gray-600">
                  添付資料の容量によりフリーメールを推奨しております。
                </p>
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">必須</span>
                携帯電話番号
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={data.registrationPhone}
                  onChange={(e) => setRegistrationPhone(e.target.value.replace(/[^0-9-]/g, ''))}
                  placeholder="例）09012345678"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-gray-700"
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center">
              次に進むと、メールアドレスが仮登録されます。利用規約とプライバシーポリシーに同意の上、ご入力ください。
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg text-sm text-gray-700">
            <p>まだ会員でない方は「新規登録」を選択してください。</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">必須</span>
                ユーザーID（メールアドレス）
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={data.loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="例）example@example.com"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">必須</span>
                パスワード
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={data.loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="パスワードを入力してください"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors text-gray-700"
                />
              </div>
              <p className="mt-2 text-xs text-blue-600 underline cursor-pointer">
                パスワードをお忘れの方
              </p>
            </div>

            <p className="text-xs text-gray-500 text-center">
              利用規約とプライバシーポリシーに同意の上、次の画面へお進みください。
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

