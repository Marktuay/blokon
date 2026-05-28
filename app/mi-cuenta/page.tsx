'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_CUSTOMER_QUERY, UPDATE_CUSTOMER_MUTATION } from '@/lib/graphql/customer';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

type Tab = 'dashboard' | 'orders' | 'addresses' | 'details';

export default function MiCuentaPage() {
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const { data, loading: customerLoading, refetch } = useQuery<any>(GET_CUSTOMER_QUERY, {
    skip: !isAuthenticated,
    fetchPolicy: 'network-only'
  });

  const [updateCustomer, { loading: updating }] = useMutation(UPDATE_CUSTOMER_MUTATION);

  // Estados de edición
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingBilling, setIsEditingBilling] = useState(false);
  const [isEditingShipping, setIsEditingShipping] = useState(false);

  // Estados de los formularios
  const [detailsForm, setDetailsForm] = useState({
    firstName: '',
    lastName: ''
  });

  const [billingForm, setBillingForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postcode: '',
    country: 'NI',
    email: '',
    phone: ''
  });

  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postcode: '',
    country: 'NI'
  });

  const customer = data?.customer || null;
  const orders = customer?.orders?.nodes || [];
  const billing = customer?.billing || null;
  const shipping = customer?.shipping || null;

  // Cargar datos en los formularios cuando se recibe la respuesta de GraphQL
  useEffect(() => {
    if (customer) {
      setDetailsForm({
        firstName: customer.firstName || '',
        lastName: customer.lastName || ''
      });
      if (customer.billing) {
        setBillingForm({
          firstName: customer.billing.firstName || '',
          lastName: customer.billing.lastName || '',
          company: customer.billing.company || '',
          address1: customer.billing.address1 || '',
          address2: customer.billing.address2 || '',
          city: customer.billing.city || '',
          state: customer.billing.state || '',
          postcode: customer.billing.postcode || '',
          country: customer.billing.country || 'NI',
          email: customer.billing.email || '',
          phone: customer.billing.phone || ''
        });
      }
      if (customer.shipping) {
        setShippingForm({
          firstName: customer.shipping.firstName || '',
          lastName: customer.shipping.lastName || '',
          company: customer.shipping.company || '',
          address1: customer.shipping.address1 || '',
          address2: customer.shipping.address2 || '',
          city: customer.shipping.city || '',
          state: customer.shipping.state || '',
          postcode: customer.shipping.postcode || '',
          country: customer.shipping.country || 'NI'
        });
      }
    }
  }, [customer]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/productos');
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#11406C]"></div>
      </div>
    );
  }

  // Formatear fecha
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('es-NI', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleUpdateDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCustomer({
        variables: {
          input: {
            firstName: detailsForm.firstName,
            lastName: detailsForm.lastName
          }
        }
      });
      setIsEditingDetails(false);
      refetch();
      alert('Detalles del perfil actualizados correctamente.');
    } catch (err: any) {
      console.error(err);
      alert(`Error al actualizar perfil: ${err.message || 'Error desconocido'}`);
    }
  };

  const handleUpdateBilling = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCustomer({
        variables: {
          input: {
            billing: {
              firstName: billingForm.firstName,
              lastName: billingForm.lastName,
              company: billingForm.company,
              address1: billingForm.address1,
              address2: billingForm.address2,
              city: billingForm.city,
              state: billingForm.state,
              postcode: billingForm.postcode,
              country: billingForm.country,
              email: billingForm.email,
              phone: billingForm.phone
            }
          }
        }
      });
      setIsEditingBilling(false);
      refetch();
      alert('Dirección de facturación actualizada correctamente.');
    } catch (err: any) {
      console.error(err);
      alert(`Error al actualizar facturación: ${err.message || 'Error desconocido'}`);
    }
  };

  const handleUpdateShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCustomer({
        variables: {
          input: {
            shipping: {
              firstName: shippingForm.firstName,
              lastName: shippingForm.lastName,
              company: shippingForm.company,
              address1: shippingForm.address1,
              address2: shippingForm.address2,
              city: shippingForm.city,
              state: shippingForm.state,
              postcode: shippingForm.postcode,
              country: shippingForm.country
            }
          }
        }
      });
      setIsEditingShipping(false);
      refetch();
      alert('Dirección de envío actualizada correctamente.');
    } catch (err: any) {
      console.error(err);
      alert(`Error al actualizar envío: ${err.message || 'Error desconocido'}`);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header de la cuenta */}
        <div className="mb-12">
          <span className="font-tt-drugs text-[#96C121] uppercase tracking-[0.2em] text-xs font-bold">Mi Cuenta</span>
          <h1 className="font-moderniz text-3xl md:text-5xl text-[#11406C] uppercase tracking-tight mt-2">
            Panel de <span className="text-[#96C121]">Usuario</span>
          </h1>
          <p className="font-acumin text-gray-500 text-sm mt-2">
            Administra tus pedidos, direcciones de entrega y detalles de facturación.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar de navegación */}
          <div className="lg:col-span-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-fit">
            <div className="flex flex-col gap-2">
              {[
                { id: 'dashboard', label: 'Escritorio', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z' },
                { id: 'orders', label: 'Pedidos', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
                { id: 'addresses', label: 'Direcciones', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z' },
                { id: 'details', label: 'Detalles del Perfil', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as Tab);
                    setIsEditingDetails(false);
                    setIsEditingBilling(false);
                    setIsEditingShipping(false);
                  }}
                  className={`w-full py-3 px-4 rounded-xl text-left text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-3 ${
                    activeTab === tab.id
                      ? 'bg-[#11406C] text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#11406C]'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                  </svg>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm min-h-[400px]">
            {customerLoading ? (
              <div className="flex justify-center items-center h-full py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#11406C]"></div>
              </div>
            ) : (
              <>
                {/* 1. Dashboard Tab */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                      <h3 className="font-moderniz text-[#11406C] text-lg uppercase tracking-tight mb-2">
                        ¡Hola, <span className="text-[#96C121]">{customer?.firstName || user?.name}</span>!
                      </h3>
                      <p className="font-acumin text-gray-500 text-sm leading-relaxed">
                        Desde el escritorio de tu cuenta puedes ver tus <span className="font-bold text-[#11406C]">pedidos recientes</span>, gestionar tus <span className="font-bold text-[#11406C]">direcciones de envío y facturación</span>, y editar tu contraseña y los detalles de tu cuenta.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div 
                        onClick={() => setActiveTab('orders')}
                        className="border border-gray-100 hover:border-[#96C121] transition-all p-6 rounded-2xl cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between"
                      >
                        <span className="font-moderniz text-xs uppercase tracking-widest text-gray-400">Total de Pedidos</span>
                        <span className="font-moderniz text-4xl text-[#11406C] font-bold mt-4">{orders.length}</span>
                      </div>
                      <div 
                        onClick={() => setActiveTab('addresses')}
                        className="border border-gray-100 hover:border-[#96C121] transition-all p-6 rounded-2xl cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between"
                      >
                        <span className="font-moderniz text-xs uppercase tracking-widest text-gray-400">Direccion Principal</span>
                        <span className="font-acumin text-xs text-gray-500 mt-4 truncate">
                          {billing?.address1 ? `${billing.address1}, ${billing.city}` : 'No definida todavía'}
                        </span>
                      </div>
                      <div 
                        onClick={() => setActiveTab('details')}
                        className="border border-gray-100 hover:border-[#96C121] transition-all p-6 rounded-2xl cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between"
                      >
                        <span className="font-moderniz text-xs uppercase tracking-widest text-gray-400">Correo Electronico</span>
                        <span className="font-acumin text-xs text-[#11406C] font-bold mt-4 truncate">{customer?.email || user?.email}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Orders Tab */}
                {activeTab === 'orders' && (
                  <div className="space-y-6">
                    <h3 className="font-moderniz text-xl text-[#11406C] uppercase tracking-tight border-b border-gray-100 pb-4">
                      Historial de Pedidos
                    </h3>
                    
                    {orders.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 border border-gray-100 rounded-2xl">
                        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <p className="font-acumin text-gray-500 text-sm">Aún no has realizado ningún pedido en línea.</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto border border-gray-100 rounded-xl">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                              <th className="p-4">Pedido</th>
                              <th className="p-4">Fecha</th>
                              <th className="p-4">Estado</th>
                              <th className="p-4">Total</th>
                              <th className="p-4 text-center">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((order: any) => (
                              <tr key={order.databaseId} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors text-sm text-gray-700">
                                <td className="p-4 font-bold text-[#11406C]">#{order.orderNumber || order.databaseId}</td>
                                <td className="p-4 font-acumin">{formatDate(order.date)}</td>
                                <td className="p-4">
                                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    order.status === 'COMPLETED' ? 'bg-green-50 text-green-700 border border-green-200' :
                                    order.status === 'PROCESSING' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                    order.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>
                                    {order.status}
                                  </span>
                                </td>
                                <td className="p-4 font-bold">{order.total}</td>
                                <td className="p-4 text-center">
                                  <button 
                                    onClick={() => alert(`Detalles del pedido #${order.databaseId} disponibles pronto.`)}
                                    className="px-3 py-1 bg-[#11406C] text-white hover:bg-[#96C121] hover:text-[#11406C] transition-colors rounded-md text-xs font-bold uppercase tracking-wider"
                                  >
                                    Ver Detalle
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Addresses Tab */}
                {activeTab === 'addresses' && (
                  <div className="space-y-6">
                    <h3 className="font-moderniz text-xl text-[#11406C] uppercase tracking-tight border-b border-gray-100 pb-4">
                      Mis Direcciones
                    </h3>
                    <p className="font-acumin text-gray-400 text-xs">
                      Las siguientes direcciones se utilizarán en la pantalla de pago de forma predeterminada.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Dirección de Facturación */}
                      <div className="border border-gray-100 p-6 rounded-2xl space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                          <h4 className="font-moderniz text-sm text-[#11406C] uppercase tracking-wider">Facturacion</h4>
                          {!isEditingBilling && (
                            <button 
                              onClick={() => setIsEditingBilling(true)}
                              className="text-xs font-bold text-[#96C121] hover:text-[#11406C] transition-colors uppercase tracking-wider"
                            >
                              Editar
                            </button>
                          )}
                        </div>
                        
                        {isEditingBilling ? (
                          <form onSubmit={handleUpdateBilling} className="space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="Nombre"
                                value={billingForm.firstName}
                                onChange={(e) => setBillingForm({ ...billingForm, firstName: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                                required
                              />
                              <input
                                type="text"
                                placeholder="Apellido"
                                value={billingForm.lastName}
                                onChange={(e) => setBillingForm({ ...billingForm, lastName: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                                required
                              />
                            </div>
                            <input
                              type="text"
                              placeholder="Empresa (Opcional)"
                              value={billingForm.company}
                              onChange={(e) => setBillingForm({ ...billingForm, company: e.target.value })}
                              className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                            />
                            <input
                              type="text"
                              placeholder="Dirección línea 1"
                              value={billingForm.address1}
                              onChange={(e) => setBillingForm({ ...billingForm, address1: e.target.value })}
                              className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                              required
                            />
                            <input
                              type="text"
                              placeholder="Dirección línea 2 (Opcional)"
                              value={billingForm.address2}
                              onChange={(e) => setBillingForm({ ...billingForm, address2: e.target.value })}
                              className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="Ciudad"
                                value={billingForm.city}
                                onChange={(e) => setBillingForm({ ...billingForm, city: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                                required
                              />
                              <input
                                type="text"
                                placeholder="Departamento / Estado"
                                value={billingForm.state}
                                onChange={(e) => setBillingForm({ ...billingForm, state: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="Código Postal"
                                value={billingForm.postcode}
                                onChange={(e) => setBillingForm({ ...billingForm, postcode: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                              />
                              <input
                                type="text"
                                placeholder="País (ej: NI)"
                                value={billingForm.country}
                                onChange={(e) => setBillingForm({ ...billingForm, country: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                                required
                              />
                            </div>
                            <input
                              type="email"
                              placeholder="Correo"
                              value={billingForm.email}
                              onChange={(e) => setBillingForm({ ...billingForm, email: e.target.value })}
                              className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                              required
                            />
                            <input
                              type="text"
                              placeholder="Teléfono"
                              value={billingForm.phone}
                              onChange={(e) => setBillingForm({ ...billingForm, phone: e.target.value })}
                              className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                              required
                            />
                            <div className="flex gap-2 justify-end pt-2">
                              <button
                                type="button"
                                onClick={() => setIsEditingBilling(false)}
                                className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md text-xs font-bold uppercase tracking-wider"
                              >
                                Cancelar
                              </button>
                              <button
                                type="submit"
                                disabled={updating}
                                className="px-3 py-1.5 bg-[#11406C] text-white hover:bg-[#96C121] hover:text-[#11406C] rounded-md text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                              >
                                {updating ? 'Guardando...' : 'Guardar'}
                              </button>
                            </div>
                          </form>
                        ) : billing?.address1 ? (
                          <div className="font-acumin text-sm text-gray-600 space-y-1">
                            <p className="font-bold text-[#11406C]">{billing.firstName} {billing.lastName}</p>
                            {billing.company && <p>{billing.company}</p>}
                            <p>{billing.address1}</p>
                            {billing.address2 && <p>{billing.address2}</p>}
                            <p>{billing.city}, {billing.state} {billing.postcode}</p>
                            <p>{billing.country}</p>
                            <p className="pt-2 text-xs text-gray-400">Tel: {billing.phone}</p>
                            <p className="text-xs text-gray-400">Email: {billing.email}</p>
                          </div>
                        ) : (
                          <p className="font-acumin text-gray-400 text-xs italic">Aún no has definido tu dirección de facturación.</p>
                        )}
                      </div>

                      {/* Dirección de Envío */}
                      <div className="border border-gray-100 p-6 rounded-2xl space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                          <h4 className="font-moderniz text-sm text-[#11406C] uppercase tracking-wider">Envio</h4>
                          {!isEditingShipping && (
                            <button 
                              onClick={() => setIsEditingShipping(true)}
                              className="text-xs font-bold text-[#96C121] hover:text-[#11406C] transition-colors uppercase tracking-wider"
                            >
                              Editar
                            </button>
                          )}
                        </div>

                        {isEditingShipping ? (
                          <form onSubmit={handleUpdateShipping} className="space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="Nombre"
                                value={shippingForm.firstName}
                                onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                                required
                              />
                              <input
                                type="text"
                                placeholder="Apellido"
                                value={shippingForm.lastName}
                                onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                                required
                              />
                            </div>
                            <input
                              type="text"
                              placeholder="Empresa (Opcional)"
                              value={shippingForm.company}
                              onChange={(e) => setShippingForm({ ...shippingForm, company: e.target.value })}
                              className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                            />
                            <input
                              type="text"
                              placeholder="Dirección línea 1"
                              value={shippingForm.address1}
                              onChange={(e) => setShippingForm({ ...shippingForm, address1: e.target.value })}
                              className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                              required
                            />
                            <input
                              type="text"
                              placeholder="Dirección línea 2 (Opcional)"
                              value={shippingForm.address2}
                              onChange={(e) => setShippingForm({ ...shippingForm, address2: e.target.value })}
                              className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="Ciudad"
                                value={shippingForm.city}
                                onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                                required
                              />
                              <input
                                type="text"
                                placeholder="Departamento / Estado"
                                value={shippingForm.state}
                                onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="Código Postal"
                                value={shippingForm.postcode}
                                onChange={(e) => setShippingForm({ ...shippingForm, postcode: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                              />
                              <input
                                type="text"
                                placeholder="País (ej: NI)"
                                value={shippingForm.country}
                                onChange={(e) => setShippingForm({ ...shippingForm, country: e.target.value })}
                                className="w-full p-2 border border-gray-200 rounded-md text-xs outline-none focus:border-[#96C121]"
                                required
                              />
                            </div>
                            <div className="flex gap-2 justify-end pt-2">
                              <button
                                type="button"
                                onClick={() => setIsEditingShipping(false)}
                                className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-md text-xs font-bold uppercase tracking-wider"
                              >
                                Cancelar
                              </button>
                              <button
                                type="submit"
                                disabled={updating}
                                className="px-3 py-1.5 bg-[#11406C] text-white hover:bg-[#96C121] hover:text-[#11406C] rounded-md text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                              >
                                {updating ? 'Guardando...' : 'Guardar'}
                              </button>
                            </div>
                          </form>
                        ) : shipping?.address1 ? (
                          <div className="font-acumin text-sm text-gray-600 space-y-1">
                            <p className="font-bold text-[#11406C]">{shipping.firstName} {shipping.lastName}</p>
                            {shipping.company && <p>{shipping.company}</p>}
                            <p>{shipping.address1}</p>
                            {shipping.address2 && <p>{shipping.address2}</p>}
                            <p>{shipping.city}, {shipping.state} {shipping.postcode}</p>
                            <p>{shipping.country}</p>
                          </div>
                        ) : (
                          <p className="font-acumin text-gray-400 text-xs italic">Aún no has definido tu dirección de envío.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Details Tab */}
                {activeTab === 'details' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                      <h3 className="font-moderniz text-xl text-[#11406C] uppercase tracking-tight">
                        Detalles del Perfil
                      </h3>
                      {!isEditingDetails && (
                        <button 
                          onClick={() => setIsEditingDetails(true)}
                          className="text-xs font-bold text-[#96C121] hover:text-[#11406C] transition-colors uppercase tracking-wider"
                        >
                          Editar
                        </button>
                      )}
                    </div>
                    
                    {isEditingDetails ? (
                      <form onSubmit={handleUpdateDetails} className="space-y-4 max-w-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-widest">Nombre</label>
                            <input
                              type="text"
                              value={detailsForm.firstName}
                              onChange={(e) => setDetailsForm({ ...detailsForm, firstName: e.target.value })}
                              className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#96C121]"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-widest">Apellido</label>
                            <input
                              type="text"
                              value={detailsForm.lastName}
                              onChange={(e) => setDetailsForm({ ...detailsForm, lastName: e.target.value })}
                              className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#96C121]"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end pt-2">
                          <button
                            type="button"
                            onClick={() => setIsEditingDetails(false)}
                            className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-500 rounded-lg text-xs font-bold uppercase tracking-wider"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            disabled={updating}
                            className="px-4 py-2 bg-[#11406C] text-white hover:bg-[#96C121] hover:text-[#11406C] rounded-lg text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                          >
                            {updating ? 'Guardando...' : 'Guardar'}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                        <div className="space-y-2">
                          <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-widest">Nombre Completo</span>
                          <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-[#11406C]">
                            {customer?.firstName || customer?.lastName ? `${customer.firstName} ${customer.lastName}` : user?.name}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-widest">Nombre de Usuario</span>
                          <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-600">
                            {customer?.username || user?.email.split('@')[0]}
                          </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-widest">Correo Electrónico</span>
                          <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-600">
                            {customer?.email || user?.email}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}
